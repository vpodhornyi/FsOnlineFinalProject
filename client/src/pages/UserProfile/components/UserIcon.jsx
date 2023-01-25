import React from 'react';
import Avatar from "@mui/material/Avatar";
import PropTypes from "prop-types";

const UserIcon = ({width, height, src, iconLetter, children}) => {

    return (
        <>
            <Avatar
                alt="UserIcon"
                sx={{
                    width: width,
                    height: height,
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