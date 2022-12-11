import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";




function CustomImageList({itemData}) {

    return (
        <Box
            sx={{
                display: "flex",
                gap: "5px",
                flex:1,
                flexDirection:"column",
                flexWrap: "wrap"
            }}
        >
            {itemData&&
                itemData.map((el, i) => {
                    const url = el?.imgUrl?el.imgUrl:el;
                    return (
                        <img style={{
                            flex: 1,
                            backgroundSize: "cover",
                            maxWidth:"100%",
                            borderRadius: "25px",
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
