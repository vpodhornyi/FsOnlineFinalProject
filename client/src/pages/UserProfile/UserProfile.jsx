import React, {useState} from 'react';
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import UserBackground from "./components/UserBackground";
import UserIcon from "./components/UserIcon";
import {Tab, Tabs, Typography} from "@mui/material";
import {useParams} from "react-router-dom";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
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

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const UserProfile = () => {
    const {username} = useParams();
    const [tabVal, setTabVal] = useState(0)
    const dispatch = useDispatch();

    const handleTabVal = (e, newVal) => setTabVal(newVal);

    const handleOnMouseEnter = (e) => e.target.innerText = "Unfollow";
    const handleOnMouseLeave = (e) => e.target.innerText = "Following";

    return (
        <Container maxWidth={"sm"} sx={{width: "100%"}}>
            <Box sx={{
                height: "100vh",
                width: "100%",
                backgroundColor: "#fff",
                display: "flex",
                flexDirection: "column"
            }}>
                <UserBackground/>
                <Box sx={{position: "relative", top: "-8%", padding: "0 10px"}}>
                    <Box sx={{display: "flex", justifyContent: "space-between"}}>
                        <UserIcon width={120} height={120} iconLetter={username[0].toUpperCase()}/>
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
                        username={username}
                        profileName={`${username}3215`}
                        joinedDate={"July 20"}
                        bio={"Hello hello hello hello hello hello hello hello hello hello hello hello"}
                        followers={10}
                        followings={10}
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