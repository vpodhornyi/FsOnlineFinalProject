import React from "react";
import { useState } from "react";
import "./colorCustomization.css";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";

import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
function BackgroundCustomization() {
  return (
    <>
      <Box
        sx={{
          flexDirection: "row",
          display: "flex",
          justifyContent: "space-between",
          paddingBottom: "4px",
          paddingTop: "4px",
          backgroundColor: "rgb(247, 249, 249)",
        }}
      >
        <Box
          sx={{
            borderRadius: "3px",
            minWidth: "120px",
            margin: "4px",
            backgroundColor: "rgb(239, 243, 244)",
            paddingTop: "5px",
            paddingBot: "7px",
            paddingRight: "20px",
            textAlign: "center",
            display: "flex",
            justifyContent: "space-around",
            fontWeight: "700",
            fontSize: "15px",
            lineHeight: "20px",
          }}
        >
          <Checkbox
            label="CheckCircleIcon"
            icon={
              <RadioButtonUncheckedIcon style={{ color: "rgb(62, 65, 68)" }} />
            }
            checkedIcon={<CheckCircleIcon />}
          />
          <p>Default</p>
        </Box>
        <Box
          sx={{
            borderRadius: "3px",
            minWidth: "120px",
            margin: "4px",
            backgroundColor: "rgba(21, 32, 43)",
            paddingTop: "5px",
            paddingBot: "7px",
            paddingRight: "20px",
            textAlign: "center",
            display: "flex",
            justifyContent: "space-around",
            fontWeight: "700",
            fontSize: "15px",
            lineHeight: "20px",
          }}
        >
          <Checkbox
            label="CheckCircleIcon"
            icon={
              <RadioButtonUncheckedIcon style={{ color: "rgb(62, 65, 68)" }} />
            }
            checkedIcon={<CheckCircleIcon />}
          />
          <p style={{ color: "white" }}>Dim</p>
        </Box>
        <Box
          sx={{
            borderRadius: "3px",
            minWidth: "120px",
            margin: "4px",
            backgroundColor: "rgba(0, 0, 0)",
            paddingTop: "5px",
            paddingBot: "7px",
            paddingRight: "20px",
            textAlign: "center",
            display: "flex",
            justifyContent: "space-around",
            fontWeight: "700",
            fontSize: "15px",
            lineHeight: "20px",
          }}
        >
          <Checkbox
            label="CheckCircleIcon"
            icon={
              <RadioButtonUncheckedIcon style={{ color: "rgb(62, 65, 68)" }} />
            }
            checkedIcon={<CheckCircleIcon />}
          />
          <p style={{ color: "white" }}>Lights out</p>
        </Box>
      </Box>
    </>
  );
}

export default BackgroundCustomization;
