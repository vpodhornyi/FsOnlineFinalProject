import React from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Main from "@pages/Main";

const MainContainer = (props) => {
  return (
    <Grid container justifyContent="center" spacing={0}>
      <Grid item xl={7} lg={7} md={8} height="100vh">
        Here goes the primary column with twits
      </Grid>
      <Grid
        item
        xl={5}
        lg={5}
        md={4}
        height="100vh"
        sx={{
          display: {
            xs: "none",
            sm: "none",
            md: "block",
            lg: "block",
            xl: "block",
          },
        }}
      >
        Here goes the right sidebar
      </Grid>
    </Grid>
  );
};

export default MainContainer;
