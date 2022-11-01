import React, {useState} from 'react';
import {Box, MenuItem, Typography} from "@mui/material";
import {useSelector, useDispatch} from "react-redux";
import {getPersonalData} from "@redux/user/selector";
import Avatar from "@mui/material/Avatar";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PropTypes from "prop-types";
import {styled} from "@mui/system";
import {getMainMenuState} from "../../../redux/business/menu/mainMenu/selector";
import useMediaQuery from "@mui/material/useMediaQuery";
import Popup, {StyledPopupText, StyledPopupTextWrap} from "./Popup";
import {useNavigate} from "react-router-dom";
import Divider from "@mui/material/Divider";
import {AUTH_ROUTE, LOGOUT_ROUTE} from "../../../utils/constants";
import {logout} from "@redux/auth/action";

const SidebarFooter = ({theme}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const open = Boolean(anchorEl);
    const id = open ? 'footer-popover' : undefined;


    const user = useSelector(getPersonalData)
    const {footerStyles} = useSelector(getMainMenuState)

    const matches = useMediaQuery('(max-width:1280px)');
    const StyledFooter = styled(props => (<Box {...props}/>))
    (({theme}) => (matches ? {...footerStyles, ...footerStyles.active} : {...footerStyles}));

    return (
        <>
            <div aria-describedby={id} onClick={handleClick}>
                <StyledFooter>
                    <div className="sidebar__footer">
                        <Avatar sx={{bgcolor: theme}}>N</Avatar>
                        <div className="footer__data">
                            <Typography>name</Typography>
                            <Typography>@username</Typography>
                        </div>
                        <div className="footer__options">
                            <MoreHorizIcon/>
                        </div>
                    </div>
                </StyledFooter>
            </div>


            <Popup
                id={id}
                open={open}
                anchorEl={anchorEl}
                handleClose={handleClose}
                anchorHorizontal={"center"}
                anchorVertical={"top"}
                originVertical={"bottom"}
                originHorizontal={"center"}
            >
                <StyledPopupTextWrap>
                    <Divider/>
                    <StyledPopupText onClick={() => navigate(AUTH_ROUTE)}>Add an existing account</StyledPopupText>
                    <StyledPopupText onClick={() => dispatch(logout())}>Log out</StyledPopupText>
                </StyledPopupTextWrap>
            </Popup>
        </>
    );
};

SidebarFooter.propTypes = {
    theme: PropTypes.string
}

export default SidebarFooter;
