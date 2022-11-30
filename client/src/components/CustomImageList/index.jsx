import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import PropTypes from "prop-types";
import Tweet from "../Tweet";
import Box from "@mui/material/Box";
function srcset(image, width, height, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${width * cols}&h=${
      height * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

function CustomImageList({ itemData }) {
  return (
    <Box
      sx={{
        maxHeight: 450,
        display: "flex",
        flexWrap: "wrap",
        gap: "4px",
        overflow: "hidden",
        borderRadius: "25px",
        // Promote the list into its own layer in Chrome. This costs memory, but helps keeping high FPS.
      }}
    >
      {itemData &&
        itemData.map((item, i) => {
          return (
            <img style={{ flex: 1 }} src={item.img} key={i} alt={item.title} />
          );
        })}
    </Box>
  );
}
CustomImageList.propTypes = {
  itemData: PropTypes.array,
};
export default CustomImageList;
