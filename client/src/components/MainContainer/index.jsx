import React, { Suspense, useMemo } from "react";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import Container from "@mui/material/Container";
import Main from "@pages/Main";
import routes from "../../routes";
import { useTheme } from "@emotion/react";
import Searchbar from "@components/Searchbar";
import { Routes, Route, useLocation } from "react-router-dom";
import { PageLoader, Preloader } from "@components/Loader";
import DialogWindow from "@components/DialogWindow";
import PrivateRoute from "@components/PrivateRoute";
import { AUTH_ROUTE, LOGOUT_ROUTE } from "../../utils/constants";
const MainContainer = (props) => {
  const { pathname } = useLocation();

  const theme = useTheme();
  const loading = useSelector((state) => state.auth.loading);
  const routeComponents = useMemo(
    () =>
      routes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={<PrivateRoute route={route} />}
        />
      )),
    []
  );
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
        {pathname !== AUTH_ROUTE && pathname !== LOGOUT_ROUTE ? (
          <Container sx={{ display: "flex" }}>
            <Preloader loaded={!loading} />
            <DialogWindow />
            <Suspense fallback={<PageLoader loaded={!loading} />}>
              <Routes>{routeComponents}</Routes>
            </Suspense>
          </Container>
        ) : (
          <>
            <Preloader loaded={!loading} />
            <DialogWindow />
            <Suspense fallback={<PageLoader loaded={!loading} />}>
              <Routes>{routeComponents}</Routes>
            </Suspense>
          </>
        )}
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
