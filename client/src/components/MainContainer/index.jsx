import React from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Main from "@pages/Main";

const MainContainer = (props) => {
  return (
    <Grid container justifyContent="center" spacing={0}>
      <Grid item md={7} s={7} xs={7}>
        <Container>Here goes the primary column with twits</Container>
      </Grid>
      <Grid item md={5} s={5} xs={5}>
        <Container>
          <Container>Here goes the right sidebar</Container>
        </Container>
      </Grid>
    </Grid>
  );
};

export default MainContainer;
