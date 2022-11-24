import React, {Suspense, useEffect, useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Route, useLocation, useRoutes} from "react-router-dom";

import {PageLoader} from "./components/Loader";
import {DialogWindow, RootContainer, Header, AppBar, Main, MainContainer} from "./components";

import Home from '@pages/Home';
import Explore from '@pages/Explore/Explore';
import Profile from '@pages/UserProfile';
import List from '@pages/Lists/Lists';
import Messages from '@pages/Messages';

const App = () => {
  const {authorized, loading, routes, menu} = useSelector(state => state.auth);

  const element = useRoutes([
    {
      path: "/messages",
      element: <Messages/>,
    },
    {
      path: "/home",
      element: <Home/>,
    },
    {
      path: "/profile",
      element: <Profile/>,
      children: [

      ],
    },
    {
      path: "list",
      element: <List/>,
      children: [

      ],
    },
  ]);

  return (
    <>
      <RootContainer>
        <Suspense fallback={<PageLoader loaded={!loading}/>}>
          <Header>
            <AppBar menu={menu} authorized={authorized}/>
          </Header>
          <Main>
            <MainContainer>
              {element}
              {/*<RouterProvider router={router}/>*/}
              {/*<Router authorized={authorized} routes={routes}/>*/}
            </MainContainer>
          </Main>
        </Suspense>
      </RootContainer>
      <DialogWindow/>
    </>
  )
}

export default App;
