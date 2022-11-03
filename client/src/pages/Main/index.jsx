import React from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import MainContainer from "@components/MainContainer";
import Box from "@mui/material/Box";
import { useTheme } from "@emotion/react";
import Sidebar from "@components/Sidebar/Sidebar";

const Main = () => {
  const theme = useTheme();
  return (
    <>
      <Grid
        container
        justifyContent="center"
        spacing={0}
        sx={{
          [theme.breakpoints.down("sm")]: {
            direction: "column",
          },
          [theme.breakpoints.up("sm")]: {
            direction: "row",
          },
        }}
      >
        <Grid item justifyContent="center" xl={3} lg={2} md={2} sm={2}>
          <Sidebar/>
        </Grid>
        <Grid
          item
          xl={9}
          lg={10}
          md={10}
          sm={10}
          xs={12}
          justifyContent="center"
        >
          <MainContainer />
        </Grid>
      </Grid>
    </>
  );
};


export default Main;
