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
} from "../../components/StyledComponents/styledComponents";
import UserProfileData from "./components/UserProfileData";
import {openDialog} from "../../redux/dialog/action";
import EditForm from "./components/EditForm";
import {useDispatch, useSelector} from "react-redux";
import {getPersonalData} from "../../redux/auth/selector";
import {getUserByUserTag} from "../../services/userApi";
import {followUser, unfollowUser} from "../../services/followService";
import {getAuthUser} from "../../redux/auth/action";

export function a11yProps(index) {
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
    const authUser = useSelector(getPersonalData);

    async function fetchUser () {
        try {
            const data = await getUserByUserTag(username);
            setUser(data);
        } catch (e) {
            console.log("request error", e)
        }
    }

    useEffect(  () => {
        fetchUser();
    }, [username, authUser]);

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
                            {
                                authUser?.userTag === username ?
                                    <StyledLightButton sx={
                                        {"&:hover": {backgroundColor: "rgba(15, 20, 25, 0.1)"}}
                                    } onClick={() => {dispatch(openDialog(EditForm))}}>
                                        Edit
                                    </StyledLightButton>
                                    :
                                    <>
                                        {user?.followers.includes(authUser?.userTag)
                                            ?
                                            <StyledLightButton
                                                sx={{
                                                    "&:hover": {
                                                        borderColor: "rgb(253, 201, 206)",
                                                        color: "rgb(244, 33, 46)",
                                                        backgroundColor: "rgba(244, 33, 46, 0.1)",
                                                        transition: "0.5s",
                                                    }
                                                }}
                                                variant="contained"
                                                onMouseEnter={handleOnMouseEnter}
                                                onMouseLeave={handleOnMouseLeave}
                                                onClick={async () => {
                                                    unfollowUser(authUser?.id, user?.id);
                                                    dispatch(getAuthUser(authUser?.id));
                                                }}
                                            >Following</StyledLightButton>
                                            :
                                            <StyledDarkButton
                                                onClick={() => {
                                                    followUser(authUser?.id, user?.id);
                                                    dispatch(getAuthUser(authUser?.id));
                                                }}
                                                variant="contained"
                                            >Follow
                                            </StyledDarkButton>
                                        }
                                    </>
                            }
                        </Box>

                        <UserProfileData
                            username={user?.name}
                            userTag={user?.userTag}
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