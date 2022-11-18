import React, {useState} from 'react';
import {Box, Typography} from "@mui/material";
import {useSelector} from "react-redux";
import {getPersonalData} from "../../../redux/auth/selector";
import Avatar from "@mui/material/Avatar";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PropTypes from "prop-types";
import {styled} from "@mui/system";
import {sidebarMenu} from "../data/sidebarMenu";
import useMediaQuery from "@mui/material/useMediaQuery";
import Popup, {StyledPopupText, StyledPopupTextWrap} from "./Popup";
import {useNavigate} from "react-router-dom";
import Divider from "@mui/material/Divider";
import {AUTH_ROUTE, LOGOUT_ROUTE} from "../../../utils/constants";

const SidebarFooter = ({theme}) => {
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const open = Boolean(anchorEl);
    const id = open ? 'footer-popover' : undefined;

    const authUser = useSelector(getPersonalData)
    const {footerStyles} = sidebarMenu;

    const matches = useMediaQuery('(max-width:1280px)');
    const StyledFooter = styled(props => (<Box {...props}/>))
    (({theme}) => (matches ? {...footerStyles, ...footerStyles.active} : {...footerStyles}));

    return (
        <>
            <div onClick={handleClick}>
                <StyledFooter>
                    <div style={{
                        display: 'flex',
                        justifyContent:'space-between',
                        alignItems: 'center',
                        fontSize: "16px",
                        padding: "10px",
                    }} className={"sidebar__footer"}>
                        <Avatar src={authUser?.avatarImgUrl} sx={{bgcolor: theme}}>{authUser?.name[0].toUpperCase()}</Avatar>
                        <div style={{
                            margin: "0 10px 0 10px"
                        }} className={"footer__data"}>
                            <Typography>{authUser?.name}</Typography>
                            <Typography>@{authUser?.userTag}</Typography>
                        </div>
                        <div className={"footer__options"}>
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
                    <StyledPopupText onClick={() => navigate(LOGOUT_ROUTE)}>Log out</StyledPopupText>
                </StyledPopupTextWrap>
            </Popup>
        </>
    );
};

SidebarFooter.propTypes = {
    theme: PropTypes.string
}

export default SidebarFooter;