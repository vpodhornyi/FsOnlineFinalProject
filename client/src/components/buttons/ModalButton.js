import React from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

// eslint-disable-next-line react/prop-types
export const ModalButton = ({ styles, click, children }) => {
  return (
    <BoxWrapper sx={styles} onClick={click}>
        <Typography>{children}</Typography>
    </BoxWrapper>
  );
};
const styles = ({ theme }) => ({
  marginBottom: "12px",
  display: "flex",
  fontSize: "15px",
  alignItems:"center",
  justifyContent: "center",
  fontWeight:700,
  minHeight: "42px",
  borderRadius:"40px",
  cursor:"pointer",
    "&:hover": {
      backgroundColor: theme.palette.primary.secondary,
    },


});

const BoxWrapper = styled(Box)(styles);
