import React, {useEffect, useState} from 'react';
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import UserBackground from "./components/UserBackground";
import UserIcon from "./components/UserIcon";
import {CircularProgress, Tab, Tabs} from "@mui/material";
import {useParams} from "react-router-dom";
import TabPanel from "./components/TabPanel";
import {
    StyledDarkButton,
    StyledLightButton,
    StyledTypography
} from "../../components/StyledComponents/styledComponents";
import UserProfileData from "./components/UserProfileData";
import {openDialog} from "../../redux/dialog/action";
import EditForm from "./components/EditForm";
import {useDispatch} from "react-redux";
import axios from "axios";

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const UserProfile = () => {
    const {username} = useParams();
    const [tabVal, setTabVal] = useState(0)
    const [user, setUser] = useState(null);
    const dispatch = useDispatch();

    async function fetchUser () {
        const {data} = await axios.get(`${process.env.REACT_APP_DEV_API_URL}users/${username}`);
        setUser(data);
    }

    useEffect(  () => {
        fetchUser();
    }, [username]);

    const handleTabVal = (e, newVal) => setTabVal(newVal);

    const handleOnMouseEnter = (e) => e.target.innerText = "Unfollow";
    const handleOnMouseLeave = (e) => e.target.innerText = "Following";

    if (!user) {
        return <Container sx={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <CircularProgress disableShrink />
        </Container>
    }

    return (
        <Container sx={{width: "100%"}}>
                <Box sx={{
                    height: "100vh",
                    width: "100%",
                    backgroundColor: "#fff",
                    display: "flex",
                    flexDirection: "column"
                }}>
                    <UserBackground imageUrl={user?.headerImgUrl || ""}/>
                    <Box sx={{position: "relative", top: "-8%", padding: "0 10px"}}>
                        <Box sx={{display: "flex", justifyContent: "space-between"}}>
                            <UserIcon src={user?.avatarImgUrl} width={120} height={120} iconLetter={user?.name[0].toUpperCase()}/>
                            {/*<StyledDarkButton variant="contained">Follow</StyledDarkButton>*/}
                            {/*<StyledLightButton*/}
                            {/*    sx={{*/}
                            {/*        "&:hover": {*/}
                            {/*            borderColor: "rgb(253, 201, 206)",*/}
                            {/*            color: "rgb(244, 33, 46)",*/}
                            {/*            backgroundColor: "rgba(244, 33, 46, 0.1)",*/}
                            {/*            transition: "0.5s",*/}
                            {/*        }*/}
                            {/*    }}*/}
                            {/*    variant="contained"*/}
                            {/*    onMouseEnter={handleOnMouseEnter}*/}
                            {/*    onMouseLeave={handleOnMouseLeave}*/}
                            {/*>Following*/}
                            {/*</StyledLightButton>*/}
                            <StyledLightButton sx={{
                                "&:hover": {
                                    backgroundColor: "rgba(15, 20, 25, 0.1)",
                                }
                            }}
                                               onClick={() => {dispatch(openDialog(EditForm))}}
                            >
                                Edit
                            </StyledLightButton>
                        </Box>

                        <UserProfileData
                            username={user?.name}
                            profileName={user?.userTag}
                            joinedDate={"July 20"}
                            location={user?.location}
                            bio={user?.bio}
                            followers={user?.followers.length}
                            followings={user?.followings.length}
                        />

                        <Box sx={{width: '100%', marginTop: "25px"}}>
                            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                                <Tabs
                                    value={tabVal}
                                    onChange={handleTabVal}
                                    aria-label="basic tabs example"
                                    indicatorColor={"primary"}
                                    textColor={"primary"}
                                    // centered
                                >
                                    <Tab label="Tweet" {...a11yProps(0)} />
                                    <Tab label="Tweet & Replies" {...a11yProps(1)} />
                                    <Tab label="Likes" {...a11yProps(2)} />
                                </Tabs>
                            </Box>
                            <TabPanel value={tabVal} index={0}>
                                Tweet Component
                            </TabPanel>
                            <TabPanel value={tabVal} index={1}>
                                Tweet & Replies Component
                            </TabPanel>
                            <TabPanel value={tabVal} index={2}>
                                Likes
                            </TabPanel>
                        </Box>
                    </Box>
                </Box>
        </Container>
    );
};

export default UserProfile;