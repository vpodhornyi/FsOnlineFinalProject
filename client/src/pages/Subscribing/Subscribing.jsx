import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import ProfilePreview from "../../components/ProfilePreview/ProfilePreview";
import noFollowers from "../../assets/img/no_followers.png"
import {CircularProgress, Tab, Tabs, Typography} from "@mui/material";
import {getUsers} from "../../services/userApi";
import Container from "@mui/material/Container";
import {PATH} from "../../utils/constants";
import {ColumnWrapper, PrimaryColumn, PrimaryHeader, SitebarColumn, StickyHeader} from "../../components";
import {Searchbar} from "../../components/Searchbar";
import PageHeader from "../../components/PageHeader/PageHeader";
import {styled} from "@mui/system";
import {useSelector} from "react-redux";
import {getCustomizationTheme} from "../../redux/user/selector";
import {BACKGROUND} from "../../utils/theme";
import {a11yProps} from "../../utils/anyProps";
import TabPanel from "../UserProfile/components/TabPanel";
import {TypographyBold} from "../UserProfile/pages/styledComponents";

const Subscribing = () => {
    const {user_tag} = useParams();
    const navigate = useNavigate();
    const path = useLocation().pathname;
    const {backgroundColor} = useSelector(getCustomizationTheme);

    const [tabVal, setTabVal] = useState(path === PATH.USER_PAGE.followers(user_tag) ? 0 : 1)

    const [userFollowers, setUserFollowers] = useState(null);
    const [userFollowings, setUserFollowings] = useState(null);
    const [name, setName] = useState("");


    useEffect(() => {
        getUsers().then(users => {
            setUserFollowers(users?.filter(user => user.followings.includes(user_tag)))
            setUserFollowings(users?.filter(user => user.followers.includes(user_tag)));
            setName(users?.filter(user => user.userTag === user_tag)[0]?.name)
        });
    }, []);

    const handleTabVal = (e, newVal) => setTabVal(newVal);

    const TypographyTab = styled(props => (<Typography {...props}/>))(() => ({
        "&": {
            color: BACKGROUND[backgroundColor]?.palette.textColor,
            cursor: "pointer",
            fontSize: "16px",
            width: "100%",
            textAlign: "center",
            padding: "15px 0",
        },
        "&:hover": {
            transition: "0.2s",
            backgroundColor: BACKGROUND[backgroundColor]?.palette.action.main
        }
    }));

    if (userFollowers === null || userFollowings === null) {
        return <Container sx={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <CircularProgress disableShrink/>
        </Container>
    }

    return (
        <ColumnWrapper>
            <PrimaryColumn>
                <PrimaryHeader pageElement={<PageHeader subtitle={`@${user_tag}`} page={name || `@${user_tag}`}/>}
                               isBack={true}/>
                <Box sx={{width: "100%"}}>
                    <Box sx={{display: "flex", justifyContent: "center", color: BACKGROUND[backgroundColor]?.palette.textColor}}>
                        <Tabs
                            value={tabVal}
                            onChange={handleTabVal}
                            aria-label="Subscribings"
                            indicatorColor={"primary"}
                            textColor={"inherit"}
                        >
                            <Tab onClick={() => navigate(PATH.USER_PAGE.followers(user_tag))}
                                 label="Followers" {...a11yProps(0)} />
                            <Tab onClick={() => navigate(PATH.USER_PAGE.followings(user_tag))}
                                 label="Followings" {...a11yProps(1)} />
                        </Tabs>
                    </Box>

                    <TabPanel value={tabVal} index={0}>
                        <>
                            {userFollowers?.length > 0 ? userFollowers?.map(u => (
                                    <ProfilePreview
                                        key={u.id}
                                        userTag={u.userTag}
                                        username={u.name}
                                        id={u.id}
                                        avatar={u.avatarImgUrl}
                                        descr={u.bio}
                                        isBio={true}
                                    />
                                )) :
                                <Box sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    maxWidth: "70%",
                                    margin: "0 auto"
                                }}>
                                    <img src={noFollowers} alt="No followers image."/>
                                    <TypographyBold sx={{margin: "15px 0 10px 0"}} variant={"h2"}>Looking
                                        for
                                        followers?</TypographyBold>
                                    <Typography variant={"body2"}>When someone follows this account, they’ll show up
                                        here.
                                        Tweeting and interacting with others helps boost followers.</Typography>
                                </Box>
                            }
                        </>
                    </TabPanel>
                    <TabPanel value={tabVal} index={1}>
                        <>
                            {userFollowings.length > 0 ? userFollowings?.map(u => (
                                    <ProfilePreview
                                        key={u.id}
                                        userTag={u.userTag}
                                        username={u.name}
                                        id={u.id}
                                        avatar={u.avatarImgUrl}
                                        descr={u.bio}
                                        isBio={true}
                                    />

                                )) :
                                <Box sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    flexDirection: "column",
                                    maxWidth: "70%",
                                    margin: "0 auto"
                                }}>
                                    <TypographyBold sx={{margin: "15px 0 10px 0"}} variant={"h2"}>Be in
                                        the
                                        know</TypographyBold>
                                    <Typography variant={"body2"}>Following accounts is an easy way to curate your
                                        timeline and
                                        know what’s happening with the topics and people you’re interested
                                        in.</Typography>
                                </Box>
                            }
                        </>
                    </TabPanel>
                </Box>

            </PrimaryColumn>
            <SitebarColumn>
                <StickyHeader>
                    <Searchbar/>
                </StickyHeader>
            </SitebarColumn>
        </ColumnWrapper>
    );
};

export default Subscribing;