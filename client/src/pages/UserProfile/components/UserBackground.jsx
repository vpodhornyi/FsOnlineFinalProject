import React from 'react';
import Box from "@mui/material/Box";
import PropTypes from "prop-types";

const UserBackground = ({imageUrl, styles, children}) => {
    return (
        <>
            <Box style={styles} sx={{
                width: "100%",
                height: "30vh",
                backgroundImage: imageUrl ? `url('${imageUrl}')` : "none",
                bgcolor: "rgb(207, 217, 222)",
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