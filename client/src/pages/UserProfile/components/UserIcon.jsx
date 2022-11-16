import React from 'react';
import Avatar from "@mui/material/Avatar";
import {useSelector} from "react-redux";
import {getMainMenuState} from "../../../redux/business/menu/mainMenu/selector";
import PropTypes from "prop-types";

const UserIcon = ({width, height, src, iconLetter, children}) => {
    const {themeColor} = useSelector(getMainMenuState);

    return (
        <>
            <Avatar
                alt="UserIcon"
                sx={{
                    width: width,
                    height: height,
                    bgcolor: themeColor,
                    backgroundImage: src ? `url('${src}')` : 'none',
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                }}
            >
                {src ? <></> : iconLetter}
                {children}
            </Avatar>
        </>
    );
};

UserIcon.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    src: PropTypes.string,
    iconLetter: PropTypes.string,
    children: PropTypes.node,
}

export default UserIcon;