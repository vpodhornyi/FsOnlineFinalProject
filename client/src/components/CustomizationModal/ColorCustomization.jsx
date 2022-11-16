import React from "react";
import { useState } from "react";
import "./colorCustomization.scss";
import Box from "@mui/material/Box";

export default function ColorCustomization() {
  return (
    <>
      <Box
        sx={{
          flexDirection: "row",
          display: "flex",
          justifyContent: "space-around",
          padding: "16px",
          backgroundColor: "rgb(247, 249, 249)",
          borderRadius: "16px",
        }}
      >
        <span className={["blue-dot", "dot"].join(" ")}></span>
        <span className={["yellow-dot", "dot"].join(" ")}></span>
        <span className={["pink-dot", "dot"].join(" ")}></span>
        <span className={["purple-dot", "dot"].join(" ")}></span>
        <span className={["orange-dot", "dot"].join(" ")}></span>
        <span className={["green-dot", "dot"].join(" ")}></span>
      </Box>
    </>
  );
}
