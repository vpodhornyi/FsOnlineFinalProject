import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { TweetForm } from "./../TweetForm/index";
import ColorCustomization from "./ColorCustomization";
import BackgroundCustomization from "./BackgroundCustomization";
import Slider from "@mui/material/Slider";
import CustomButton from "@components/CustomButton";
const buttonStyle = {
  color: "white",
  backgroundColor: "rgb(29, 155, 240)",
};
export default function CustomizationModal() {
  return (
    <>
      <Box
        sx={{
          width: ["440px", "!important"],
          paddingLeft: "30px",
          paddingRight: "30px",
          overflow: "hidden",
          maxHeight: "90vw",
        }}
      >
        <Box
          sx={{
            fontSize: "23px",
            fontWeight: 800,
            textAlign: "center",
            marginTop: "32px",
            marginBottom: "12px",
            lineHeight: "28px",
          }}
        >
          Customize your view
        </Box>

        <Box
          sx={{
            fontSize: "15px",
            fontWeight: 400,
            textAlign: "center",
            lineHeight: "20px",
          }}
        >
          These settings affect all the Twitter accounts on this browser.
        </Box>

        <Box
          sx={{
            fontSize: "13px",
            color: "rgb(83, 100, 113)",
            fontWeight: 700,
            lineHeight: "20px",
          }}
        >
          Font size
        </Box>
        <Slider step={1} marks min={1} max={5} />
        <Box
          sx={{
            fontSize: "13px",
            color: "rgb(83, 100, 113)",
            fontWeight: 700,
            lineHeight: "20px",
          }}
        >
          Color
        </Box>
        <ColorCustomization />
        <Box
          sx={{
            fontSize: "13px",
            color: "rgb(83, 100, 113)",
            fontWeight: 700,
            lineHeight: "20px",
          }}
        >
          Background
        </Box>
        <BackgroundCustomization />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <CustomButton name="Done" customStyle={buttonStyle} />
        </Box>
      </Box>
    </>
  );
}
