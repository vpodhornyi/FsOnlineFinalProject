import React, {useState} from "react";
import {useSelector} from 'react-redux';

import MenuItemLink from "./MenuItemLink";
import CustomMenuItem from "./CustomMenuItem";
import {getMainMenuState} from "../../../redux/business/menu/mainMenu/selector";
import {MenuList, Box, Link} from "@mui/material";
import {styled} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import LogoIcon from "../../icons/LogoIcon";
import {getLogoIconState} from "../../../redux/business/logoIcon/selector";
import Button from "@mui/material/Button";
import TweetButton from "./TweetButton";
import Popup, {StyledPopupText, StyledPopupTextWrap} from "./Popup";
import {useLocation} from "react-router-dom";
import Divider from "@mui/material/Divider";
import {AUTH_ROUTE, LOGOUT_ROUTE} from "../../../utils/constants";


const SidebarMenu = () => {
    let location = useLocation();

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const open = Boolean(anchorEl);
    const id = open ? 'more-popover' : undefined;

    const {
        mainMenuStyle,
        buttonStyles,
        navItems,
        more: {
            iconName,
            text
        },
        textStyle,
    } = useSelector(getMainMenuState);

    const {
        logo: {
            color,
            href
        },
    } = useSelector(getLogoIconState);

    const matches = useMediaQuery('(max-width:1280px)');

    const StyledMenuList = styled(props => (<MenuList {...props}/>))
    (({theme}) => (matches ? {...mainMenuStyle, ...mainMenuStyle.active} : {...mainMenuStyle}));

    const StyledButton = styled(props => (<Button {...props}/>))(() => ({...buttonStyles}))
    const StyledIconWrap = styled(props => (<Box {...props}/>))(() => ({
        '&:hover > .MuiMenuItem-root': {
            borderRadius: 40,
            backgroundColor: '#E0E0E0'
        },
        display: 'flex',
        cursor: 'pointer'
    }));
    return (
        <>
            <div aria-describedby={id} onClick={(e) => {
                if (e.target.className.baseVal.includes("css-i4bv87")) {
                    handleClick(e)
                }
            }}>

                <StyledMenuList>
                    <Link
                        sx={{padding: "15px"}}
                        color={color}
                        href={href}>
                        <LogoIcon/>
                    </Link>
                    {navItems.map(({text, iconName, iconActive, color, href}) => (
                            <MenuItemLink
                                key={text}
                                iconName={location.pathname === href ? iconActive : iconName}
                                text={text}
                                textStyle={location.pathname === href ? {...textStyle, ...textStyle.active} : textStyle}
                                iconStyle={{color, fontSize: 30}}
                                href={href}/>
                        )
                    )}

                    <StyledIconWrap>
                        <CustomMenuItem iconName={iconName} text={text}/>
                    </StyledIconWrap>

                    {matches ? <TweetButton/> : <StyledButton>Tweet</StyledButton>}
                </StyledMenuList>
            </div>

            <Popup
                id={id}
                open={open}
                anchorEl={anchorEl}
                handleClose={handleClose}
                anchorVertical={"bottom"}
                anchorHorizontal={"center"}
                originVertical={"bottom"}
                originHorizontal={"center"}
            >
                <StyledPopupTextWrap>
                    <StyledPopupText><CustomMenuItem iconName={"DisplaySettingsOutlined"} text={"Display"}/></StyledPopupText>
                </StyledPopupTextWrap>
            </Popup>
        </>
    );
}

export default SidebarMenu;
