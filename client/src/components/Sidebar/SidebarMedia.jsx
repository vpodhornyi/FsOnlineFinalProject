import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Avatar from "@mui/material/Avatar";
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import {
    BottomNavigation,
    BottomNavigationAction,
    MenuList,
    Typography
} from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import {useState} from "react";
import {useSelector} from "react-redux";
import {sidebarMenu} from "./data/sidebarMenu";
import MenuItemLink from "./components/MenuItemLink";
import {EXPLORE_ROUTE, HOME_ROUTE, MESSAGES_ROUTE, NOTIFICATIONS_ROUTE} from "../../utils/constants";
import {useNavigate} from "react-router-dom";
import TweetButton from "./components/TweetButton";
import Dropdown from "../Dropdown/Dropdown";
import {StyledTypography} from "../StyledComponents/styledComponents";
import {getPersonalData} from "../../redux/auth/selector";

export default function SidebarMedia() {
    const navigate = useNavigate();

    const [state, setState] = useState({
        left: false,
    });

    const sidebarInfo = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    }

    const authUser = useSelector(getPersonalData)

    const [value, setValue] = useState(HOME_ROUTE);

    const {mainMenuStyle, mediaNavItems, themeColor, textStyle, dropdownData} = sidebarMenu;

    const StyledMenuList = styled(props => (<MenuList {...props}/>))(({theme}) => ({...mainMenuStyle}));

    const toggleDrawer = (anchor, open) => (event) => {
        setState({...state, [anchor]: open});
    };

    const handleChangeBottomNav = (event, newValue) => {
        setValue(newValue);
        navigate(newValue);
    };

    return (
        <div>
            <React.Fragment key={"left"}>
                <Button onClick={toggleDrawer("left", true)}>
                    <Avatar sx={{bgcolor: themeColor}}>{authUser?.name[0].toUpperCase()}</Avatar>
                </Button>
                <SwipeableDrawer
                    anchor={"left"}
                    open={state["left"]}
                    onClose={toggleDrawer("left", false)}
                    onOpen={toggleDrawer("left", true)}
                >
                    <Box
                        sx={{width: 250}}
                        role="presentation"
                    >
                        <div style={{
                            padding: "15px",
                            boxSizing: "border-box",
                            minHeight: "100vh"
                        }}>
                            <div style={sidebarInfo}>
                                <Typography>Account Info</Typography>
                                <CloseIcon onClick={toggleDrawer("left", false)}/>
                            </div>
                            <div style={sidebarInfo}>
                                <Avatar src={authUser?.avatarImgUrl} sx={{bgcolor: themeColor}}>N</Avatar>
                                <p style={{
                                    border: "1px solid gray",
                                    padding: "3px 10px",
                                    borderRadius: "50%",
                                    fontSize: "25px"
                                }}>
                                    +
                                </p>
                            </div>
                            <Box sx={{margin: "-10px 0 20px 0"}}>
                                <Typography>{authUser?.name}</Typography>
                                <Typography sx={{color: "gray"}}>@{authUser?.userTag}</Typography>
                            </Box>

                            <Box sx={{"& ": {
                                    display: "flex",
                                    margin: "0 0 20px 0"
                                }, "& > .MuiTypography-root": {
                                    fontSize: "14px",
                                    color: "gray",
                                    margin: "0 12px 0 0"
                                }}}>
                                <StyledTypography><strong style={{color: "black"}}>{authUser?.followers.length}</strong> Followers</StyledTypography>
                                <StyledTypography sx={{marginLeft: "10px"}}><strong style={{color: "black"}}>{authUser?.followings.length}</strong> Followings</StyledTypography>
                            </Box>

                            <StyledMenuList
                                sx={{"& .MuiButtonBase-root": {padding: "0"}}}
                                onClick={toggleDrawer("left", false)}
                            >   {mediaNavItems.map(({text, iconName, color, href}) => (
                                    <MenuItemLink
                                        key={text}
                                        iconName={iconName}
                                        text={text}
                                        textStyle={textStyle}
                                        iconStyle={{color, fontSize: 30}}
                                        href={href}
                                    />
                                ))}
                            </StyledMenuList>

                            <Divider sx={{ bgcolor: "gray", marginBottom: "40px" }}/>

                            <Dropdown head={dropdownData.head} content={dropdownData.content}/>

                        </div>
                    </Box>
                </SwipeableDrawer>

                <BottomNavigation sx={{ width: "100%", position: "fixed", top: "92vh"}}  value={value} onChange={handleChangeBottomNav}>
                        <BottomNavigationAction label="" value={HOME_ROUTE} icon={<HomeIcon/>}/>
                        <BottomNavigationAction label="" value={EXPLORE_ROUTE} icon={<ExploreIcon/>}/>
                        <BottomNavigationAction label="" value={NOTIFICATIONS_ROUTE} icon={<NotificationsIcon/>}/>
                        <BottomNavigationAction label="" value={MESSAGES_ROUTE} icon={<MailOutlineIcon />}/>
                </BottomNavigation>
            </React.Fragment>

            <TweetButton/>
        </div>
    );
}