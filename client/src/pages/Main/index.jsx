import React from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import MainContainer from "@components/MainContainer";
import Box from "@mui/material/Box";
const Main = () => {
  return (
    <>
      <Grid container justifyContent="center" spacing={0}>
        <Grid
          item
          xl={3}
          lg={3}
          sx={{
            display: {
              xs: "none",

              lg: "block",
              xl: "block",
            },
          }}
        >
          <span>Here goes the left sidebar</span>
        </Grid>
        <Grid item xl={9} lg={9}>
          <MainContainer />
        </Grid>
      </Grid>
    </>
  );
};

export default Main;
