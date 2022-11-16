import React, { useState } from "react";
import Box from "@mui/material/Box";
function Dot(color) {
  const [active, setActive] = useState(false);
  return (
    <>
      <Box
        sx={{
          display: active ? "block" : "none",
        }}
      ></Box>
    </>
  );
}

export default Dot;
