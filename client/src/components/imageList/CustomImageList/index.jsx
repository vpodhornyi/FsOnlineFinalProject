import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";




function CustomImageList({itemData}) {

    return (
        <Box
            sx={{
                display: "flex",
                gap: "10px",
                flex:1,
                flexDirection:"column",
                borderRadius: "25px",
                flexWrap: "wrap"
            }}
        >
            {itemData&&
                itemData.map((url, i) => {
                    return (
                        <Box sx={{
                            backgroundImage: `url(${url})`,
                            borderRadius: "25px",
                            flex: 1,
                            backgroundSize: "cover"
                        }} src={url} key={i} alt={url}/>
                    );
                })}
        </Box>

    );
}

CustomImageList.propTypes = {
    itemData: PropTypes.array,
};
export default CustomImageList;
