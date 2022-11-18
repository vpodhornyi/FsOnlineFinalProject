import React from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Main from "@pages/Main";
import { useTheme } from "@emotion/react";
import Searchbar from "@components/Searchbar";
const MainContainer = (props) => {
  const theme = useTheme();
  return (
    <Grid
      container
      justifyContent="center"
      spacing={0}
      height="100vh"
      padding={0}
      margin={0}
    >
      <Grid
        item
        xl={7}
        lg={7}
        md={8}
        sm={12}
        height="100vh"
        justifyContent="center"
      >
        Here goes the primary column with twits
      </Grid>
      <Grid
        item
        justifyContent="center"
        height="100vh"
        xl={5}
        lg={5}
        md={4}
        sx={{
          [theme.breakpoints.down("md")]: {
            display: "none",
          },
          [theme.breakpoints.up("md")]: {
            display: "block",
          },
        }}
      >
        <Searchbar />
      </Grid>
    </Grid>
  );
};

export default MainContainer;
