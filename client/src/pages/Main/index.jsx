import React from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import MainContainer from "@components/MainContainer";
import Box from "@mui/material/Box";
import { useTheme } from "@emotion/react";
const Main = () => {
  const theme = useTheme();
  return (
    <>
      <Grid container justifyContent="center" spacing={0} height="100vh">
        <Grid
          item
          justifyContent="center"
          xl={3}
          lg={2}
          md={2}
          sm={2}
          sx={{
            [theme.breakpoints.down("sm")]: {
              display: "none",
            },
            [theme.breakpoints.up("sm")]: {
              display: "block",
            },
          }}
        >
          <span>Here goes the left sidebar</span>
        </Grid>
        <Grid item xl={9} lg={10} md={10} sm={10} justifyContent="center">
          <MainContainer />
        </Grid>
      </Grid>
    </>
  );
};

export default Main;
