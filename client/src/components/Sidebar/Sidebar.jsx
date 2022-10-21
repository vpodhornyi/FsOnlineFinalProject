import React, {useState} from "react";
import "./css/sidebarc.scss";

import TwitterIcon from '@mui/icons-material/Twitter';
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ArticleIcon from '@mui/icons-material/Article';
import PersonIcon from '@mui/icons-material/Person';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import Avatar from '@mui/material/Avatar';
import {deepOrange} from "@mui/material/colors";
import Popover from '@mui/material/Popover';
import {Typography} from "@mui/material";
import SidebarMedia from "./SidebarMedia";

const Sidebar = () => {

    const [popup, setPopup] = useState(null);
    const screenWidth = window.screen.width;
    const handlePopupOpen = ev => setPopup(ev.currentTarget);
    const handlePopupClose = ev => setPopup(null);

    const isOpen = Boolean(popup);
    const popupId = open ? 'options' : undefined;

    return (
        <>
            {screenWidth < 420 ?
                <SidebarMedia/> :
                <div className="sidebar">
                    <div className="sidebar__content">
                        <div className="content__item sidebar-hover">
                            <TwitterIcon/>
                        </div>
                        <div className="content__item sidebar-hover">
                            <HomeIcon/>
                            <span>Home</span>
                        </div>
                        <div className="content__item sidebar-hover">
                            <ExploreIcon/>
                            <span>Explore</span>
                        </div>
                        <div className="content__item sidebar-hover">
                            <NotificationsIcon/>
                            <span>Notifications</span>
                        </div>
                        <div className="content__item sidebar-hover">
                            <MailOutlineIcon/>
                            <span>Messages</span>
                        </div>
                        <div className="content__item sidebar-hover">
                            <BookmarkIcon/>
                            <span>Bookmarks</span>
                        </div>
                        <div className="content__item sidebar-hover">
                            <ArticleIcon/>
                            <span>Lists</span>
                        </div>
                        <div className="content__item sidebar-hover">
                            <PersonIcon/>
                            <span>Profile</span>
                        </div>
                        <div className="content__item sidebar-hover">
                            <MoreHorizIcon/>
                            <span>More</span>
                        </div>
                        <div className="content__item-btn">
                            <div>Tweet</div>
                        </div>
                        <Avatar sx={{bgcolor: deepOrange[500]}} className="btn-media sidebar-hover">
                            <HistoryEduIcon/>
                        </Avatar>
                    </div>

                    <div className="sidebar__footer sidebar-hover" onClick={handlePopupOpen} aria-describedby={popupId}>
                        <Avatar sx={{bgcolor: deepOrange[500]}}>N</Avatar>
                        <div className="footer__data">
                            {/*тут будет стоять аттрибут src на аву юзера*/}
                            <p className="data-name">name</p>
                            <p className="data-username">@username</p>
                        </div>
                        <div className="footer__options">
                            <MoreHorizIcon/>
                        </div>
                    </div>

                    <Popover
                        id={popupId}
                        open={isOpen}
                        anchorEl={popup}
                        onClose={handlePopupClose}
                        className="popover"
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "center"
                        }}
                    >
                        <div>
                            <Typography>Add an existing account</Typography>
                            <Typography>Log out @username</Typography>
                        </div>
                    </Popover>
                </div>
            }
        </>
    );
};

export default Sidebar;