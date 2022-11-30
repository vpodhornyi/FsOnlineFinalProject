import React from "react";
import {useSelector} from "react-redux";
import {useLocation, useRoutes} from "react-router-dom";

import {
  Preloader, DialogWindow, RootContainer, LoginPanel, Header, AppBar, Main, MainContainer
} from "./components";
import {menu, mainRoutes, modalRoutes} from './routes';
import {BackgroundContext} from "./utils/context";

const App = () => {
  const {authorized, user: {userTag}} = useSelector(state => state.auth);
  const location = useLocation();
  const background = location.state?.background;
  const mainContainerRoutes = useRoutes(mainRoutes(userTag, authorized), background || location);
  const modalPageRoutes = useRoutes(modalRoutes(authorized));

  return (
    <BackgroundContext.Provider value={{background}}>
      <Preloader loading={false}/>
      <RootContainer>
        <Header>
          <AppBar menu={menu(userTag, authorized)} authorized={authorized}/>
        </Header>
        <Main>
          <MainContainer>
            {mainContainerRoutes}
          </MainContainer>
        </Main>
        {modalPageRoutes}
        {!authorized && <LoginPanel/>}
        <DialogWindow/>
      </RootContainer>
    </BackgroundContext.Provider>
  )
}

export default App;
