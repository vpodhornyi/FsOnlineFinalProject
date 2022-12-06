import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import CustomImageList from "../CustomImageList";


function ImageListContainer({photos}) {

    const filterEvenOrObb = (arr, type) => {
        return arr.filter((item, i) => {
            const num = type === "even" ? 2 : 3;
            return i % num === 0
        })
    }
    return (
        <Box sx={{
            padding: "10px",
            display: "flex",
            gap: "10px",
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
