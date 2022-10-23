import React from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Main from "@pages/Main";

const MainContainer = (props) => {
  return (
    <Grid container justifyContent="center" spacing={0}>
      <Grid item md={7} s={7} xs={7} height="100vh">
        Here goes the primary column with twits
      </Grid>
      <Grid item md={5} s={5} xs={5} height="100vh">
        Here goes the right sidebar
      </Grid>
    </Grid>
  );
};

export default MainContainer;
