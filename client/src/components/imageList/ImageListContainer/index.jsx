import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import CustomImageList from "../CustomImageList";


function ImageListContainer({photos}) {

    const filterEvenOrObb = (arr, type) => {
        return arr.filter((item, i) => {
         return   type === "even"?i % 2 === 0:i % 2 !== 0;


    })}
    return (
        <Box sx={{
            padding: "5px",
            display: "flex",
            gap: "5px",
            minHeight: "260px"
        }}>
            {photos && <><CustomImageList itemData={filterEvenOrObb(photos, "even")}/>
                {photos.length > 1 && <CustomImageList itemData={filterEvenOrObb(photos, "obb")}/>
                    }</>}
        </Box>
    );
}

ImageListContainer.propTypes = {
    photos: PropTypes.array,
};
export default ImageListContainer;
