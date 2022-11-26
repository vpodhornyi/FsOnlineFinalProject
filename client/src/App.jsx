import React from "react";
import {useSelector} from "react-redux";
import {useRoutes} from "react-router-dom";

import {Preloader} from "./components";
import {DialogWindow, RootContainer, Header, AppBar, Main, MainContainer} from "./components";
import {routes} from './routes';
import {menu} from './routes';

const App = () => {
  const {authorized, loading, user: {userTag}} = useSelector(state => state.auth);
  const Routes = () => useRoutes(routes(userTag, authorized));

  return (
    <RootContainer>
      <Preloader loading={loading}/>
      <Header>
        <AppBar menu={menu(userTag, authorized)} authorized={authorized}/>
      </Header>
      <Main>
        <MainContainer>
          <Routes/>
        </MainContainer>
      </Main>
      <DialogWindow/>
    </RootContainer>
  )
}

export default App;
