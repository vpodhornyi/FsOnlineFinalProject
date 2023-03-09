import React, {useEffect, useState} from 'react';
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import UserBackground from "./components/UserBackground";
import UserIcon from "./components/UserIcon";
import {CircularProgress, Tab, Tabs} from "@mui/material";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import TabPanel from "./components/TabPanel";
import {
    ThemeButtonDark,
    ThemeButtonLight, ThemeButtonLightNoHover,
} from "./pages/styledComponents";
import UserProfileData from "./components/UserProfileData";
import {useDispatch, useSelector} from "react-redux";
import {getCustomizationTheme, getPersonalData} from "../../redux/user/selector";
import {getUserByUserTag} from "../../services/userApi";
import {followUser, unfollowUser} from "../../services/followService";
import {getAuthUser} from "../../redux/user/action";
import {PATH} from "../../utils/constants";
import {ColumnWrapper, PrimaryColumn, PrimaryHeader, SitebarColumn, StickyHeader} from "../../components";

import Likes from "./pages/Likes";
import TweetReplies from "./pages/TweetReplies";
import UserTweets from "./pages/UserTweets";
import {Searchbar} from "../../components/Searchbar";
import PageHeader from "../../components/PageHeader/PageHeader";
import {a11yProps} from "../../utils/anyProps";
import {BACKGROUND} from "../../utils/theme";
import {getAuthorized} from "../../redux/auth/selector";

const UserProfile = () => {
    const {backgroundColor} = useSelector(getCustomizationTheme);
    const dispatch = useDispatch();
    const authUser = useSelector(getPersonalData);
    const {user_tag} = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [tabVal, setTabVal] = useState(
        location.pathname === PATH.USER_PAGE.userProfile(user_tag) ? 0 :
            location.pathname === PATH.USER_PAGE.tweetReplies(user_tag) ? 1 : 2
    );
    const [user, setUser] = useState(null);
    const isAuth = useSelector(getAuthorized);

    const fetchUser = async () => {
        const data = await getUserByUserTag(user_tag);
        setUser(data);
    }

    useEffect(() => {
        fetchUser();
    }, [user_tag, authUser]);

    const handleTabVal = (e, newVal) => setTabVal(newVal);

    const handleOnMouseEnter = (e) => e.target.innerText = "Unfollow";
    const handleOnMouseLeave = (e) => e.target.innerText = "Following";

    if (!user) {
        return <Container sx={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <CircularProgress disableShrink/>
        </Container>
    }


    return (
        <ColumnWrapper>
            <PrimaryColumn>
                <PrimaryHeader pageElement={<PageHeader subtitle={`@${user?.userTag}`} page={user?.name}/>} isBack={true}/>
                <div style={{width: "100%", padding: "0"}}>
                    <UserBackground imageUrl={user?.headerImgUrl || ""}/>
                    <Box sx={{position: "relative", top: "-7vh", padding: "0 10px"}}>
                        <Box sx={{display: "flex", justifyContent: "space-between"}}>
                            <UserIcon src={user?.avatarImgUrl} width={120} height={120}
                                      iconLetter={user?.name[0].toUpperCase()}/>
                            {
                                authUser?.userTag === user_tag ?
                                    <ThemeButtonLightNoHover
                                        onClick={() => navigate(PATH.SETTINGS.PROFILE, {
                                            state: {background: location}
                                        })}
                                    >
                                        Edit profile
                                    </ThemeButtonLightNoHover>
                                    :
                                    <>
                                        {user?.followers.includes(authUser?.userTag)
                                            ?
                                            <ThemeButtonLight
                                                variant="contained"
                                                onMouseEnter={handleOnMouseEnter}
                                                onMouseLeave={handleOnMouseLeave}
                                                onClick={async () => {
                                                    unfollowUser(authUser?.id, user?.id);
                                                    dispatch(getAuthUser());
                                                }}

                                            >Following</ThemeButtonLight>
                                            :
                                            <ThemeButtonDark
                                                onClick={async () => {
                                                    if (isAuth) {
                                                        followUser(authUser?.id, user?.id);
                                                        dispatch(getAuthUser());
                                                    } else {
                                                        navigate(`${PATH.AUTH.ROOT}/${PATH.AUTH.SING_IN.LOGIN}`, {state: {background: location}});                                                    }
                                                }}
                                                variant="contained"
                                            >Follow
                                            </ThemeButtonDark>
                                        }
                                    </>
                            }
                        </Box>
                        <UserProfileData
                            username={user?.name}
                            userTag={user?.userTag}
                            joinedDate={"July 20"}
                            location={user?.location}
                            birthDate={user?.birthDate}
                            bio={user?.bio}
                            followers={user?.followers.length}
                            followings={user?.followings.length}
                        />
                        <Box sx={{width: '100%', marginTop: "25px"}}>
                            <Box sx={{color: BACKGROUND[backgroundColor]?.palette.textColor}}>
                                <Tabs
                                    value={tabVal}
                                    onChange={handleTabVal}
                                    aria-label="User profile"
                                    indicatorColor={"primary"}
                                    textColor={"inherit"}
                                >
                                    <Tab onClick={() => navigate(PATH.USER_PAGE.userProfile(user_tag))}
                                         label="Tweets" {...a11yProps(0)} />
                                    <Tab onClick={() => navigate(PATH.USER_PAGE.tweetReplies(user_tag))}
                                         label="Replies" {...a11yProps(1)} />
                                    <Tab onClick={() => navigate(PATH.USER_PAGE.likes(user_tag))}
                                         label="Likes" {...a11yProps(2)} />
                                </Tabs>
                            </Box>
                            <TabPanel value={tabVal} index={0}>
                                <UserTweets/>
                            </TabPanel>
                            <TabPanel value={tabVal} index={1}>
                                <TweetReplies userId={user?.id}/>
                            </TabPanel>
                            <TabPanel value={tabVal} index={2}>
                                <Likes/>
                            </TabPanel>
                        </Box>
                    </Box>
                </div>
            </PrimaryColumn>
            <SitebarColumn>
                <StickyHeader>
                    <Searchbar/>
                </StickyHeader>
            </SitebarColumn>
        </ColumnWrapper>
    );
};

export default UserProfile;