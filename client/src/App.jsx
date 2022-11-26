import React, {Suspense} from "react";
import {useSelector} from "react-redux";
import {useRoutes} from "react-router-dom";

import {PageLoader} from "./components/Loader";
import {DialogWindow, RootContainer, Header, AppBar, Main, MainContainer} from "./components";
import {routes} from './routes';
import {menu} from './routes';

const App = () => {
  const {authorized, loading, user: {userTag}} = useSelector(state => state.auth);
  const Routes = () => useRoutes(routes(userTag));

  return (
    <RootContainer>
      <Suspense fallback={<PageLoader loaded={!loading}/>}>
        <Header>
          <AppBar menu={menu(userTag)} authorized={authorized}/>
        </Header>
        <Main>
          <MainContainer>
            <Routes/>
          </MainContainer>
        </Main>
        <DialogWindow/>
      </Suspense>
    </RootContainer>
  )
}

export default App;
