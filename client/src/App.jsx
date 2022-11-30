import React from "react";
import {useSelector} from "react-redux";
import {useLocation, useRoutes} from "react-router-dom";

import {
  Preloader, DialogWindow, RootContainer, LoginPanel, Header, NavBar, Main, MainContainer
} from "./components";
import {mainRoutes, modalRoutes} from './routes';
import {menu} from './utils/menu';
import {BackgroundContext} from "./utils/context";

const App = () => {
  const {authorized} = useSelector(state => state.auth);
  const {user: {userTag}, preloader} = useSelector(state => state.user);
  const location = useLocation();
  const background = location.state?.background;
  const mainContainerRoutes = useRoutes(mainRoutes(userTag, authorized), background || location);
  const modalPageRoutes = useRoutes(modalRoutes(authorized));

  return (
    <BackgroundContext.Provider value={{background}}>
      <Preloader loading={preloader}/>
      <RootContainer>
        <Header>
          <NavBar menu={menu(userTag, authorized)} authorized={authorized}/>
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
