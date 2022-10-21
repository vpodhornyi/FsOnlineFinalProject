import * as React from 'react';
import "./css/sidebar-media.scss"
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Avatar from "@mui/material/Avatar";
import {deepOrange} from "@mui/material/colors";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ArticleIcon from "@mui/icons-material/Article";
import PersonIcon from "@mui/icons-material/Person";
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    BottomNavigation,
    BottomNavigationAction,
    Typography
} from "@mui/material";
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import {useState} from "react";

export default function SidebarMedia() {
    const [state, setState] = useState({
        left: false,
    });

    const [value, setValue] = useState('home');

    const handleChangeBottomNav = (event, newValue) => {
        setValue(newValue);
    };

    const AccordionSummary = styled((props) => (
        <MuiAccordionSummary
            expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '12px', color: "white" }} />}
            {...props}
        />
    ))(({ theme }) => ({
        fontSize: '12px',
        padding: 0,
        backgroundColor: 'black',
        flexDirection: 'row-reverse',
        '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
            transform: 'rotate(90deg)',
        },
        '& .MuiAccordionSummary-content': {
            marginLeft: theme.spacing(1),
        },
    }));

    const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
        padding: 0,
        borderTop: '1px solid rgba(0, 0, 0, .125)',
    }));

    const toggleDrawer = (anchor, open) => (event) => {
        setState({...state, [anchor]: open});
    };

    const [expanded, setExpanded] = useState('');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <div>
            <React.Fragment key={"left"}>
                <Button onClick={toggleDrawer("left", true)}>
                    <Avatar sx={{bgcolor: deepOrange[500]}}>N</Avatar>
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
                        <div className="sidebar-media">
                            <div className="sidebar__info sidebar__info-mg">
                                <p>Account Info</p>
                                <CloseIcon onClick={toggleDrawer("left", false)}/>
                            </div>
                            <div className="sidebar__info">
                                <Avatar sx={{bgcolor: deepOrange[500]}}>N</Avatar>
                                <p className="sidebar__info-add">
                                    +
                                </p>
                            </div>
                            <div className="sidebar__subinfo">
                                <p>username</p>
                                <p>@username</p>
                            </div>
                            <div className="sidebar__followers">
                                <p><strong style={{color: "white"}}>8</strong> Followers</p>
                                <p><strong style={{color: "white"}}>0</strong> Followings</p>
                            </div>

                            <div className="sidebar__links">
                                <BookmarkIcon/>
                                <span>Bookmarks</span>
                            </div>
                            <div className="sidebar__links">
                                <ArticleIcon/>
                                <span>Lists</span>
                            </div>
                            <div className="sidebar__links">
                                <PersonIcon/>
                                <span>Profile</span>
                            </div>

                            <Divider sx={{ bgcolor: "gray", marginBottom: "40px" }}/>

                            <div>
                                <Accordion sx={{bgcolor: "black", color: "white"}} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                                    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                                        <Typography sx={{fontSize: 14}}>Settings and Support</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <div className="sidebar__links sidebar__links-small">
                                            <DisplaySettingsIcon/>
                                            <span>Display</span>
                                        </div>
                                        <div className="sidebar__links sidebar__links-small">
                                            <LogoutIcon/>
                                            <span>Logout</span>
                                        </div>
                                    </AccordionDetails>
                                </Accordion>
                            </div>
                        </div>
                    </Box>
                </SwipeableDrawer>

                <BottomNavigation sx={{ width: "100%", position: "fixed", top: "92vh"}}  value={value} onChange={handleChangeBottomNav}>
                    <BottomNavigationAction label="" value="home" icon={<HomeIcon/>}/>
                    <BottomNavigationAction label="" value="search" icon={<ExploreIcon/>}/>
                    <BottomNavigationAction label="" value="notifications" icon={<NotificationsIcon/>} />
                    <BottomNavigationAction label="" value="messages" icon={<MailOutlineIcon />}/>
                </BottomNavigation>
            </React.Fragment>
        </div>
    );
}