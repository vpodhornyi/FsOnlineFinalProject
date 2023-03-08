import React from 'react';
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import {useSelector} from "react-redux";
import {BACKGROUND} from "../../../utils/theme";

const UserBackground = ({imageUrl, styles, children}) => {
    const {backgroundColor} = useSelector(state => state.user.customize);

    return (
        <>
            <Box style={styles} sx={{
                width: "100%",
                height: "25vh",
                backgroundImage: imageUrl ? `url('${imageUrl}')` : "none",
                bgcolor: BACKGROUND[backgroundColor]?.palette.profileBackground || '#313135',
                backgroundPosition: "center",
                backgroundSize: "cover",
                display: "block"
            }}>
                {children}
            </Box>
        </>
    );
};

UserBackground.propTypes = {
    imageUrl: PropTypes.string,
    styles: PropTypes.object,
    children: PropTypes.node,
}

export default UserBackground;