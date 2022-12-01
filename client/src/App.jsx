import React from "react";
import {useSelector} from "react-redux";
import {useLocation} from "react-router-dom";

import {
  Preloader, DialogWindow, RootContainer, LoginPanel,
  Header, NavBar, Main, MainContainer
} from "./components";
import {menu} from './utils/menu';
import {BackgroundContext} from "./utils/context";
import MainRoutes from './routes/MainRoutes';
import ModalRoutes from './routes/ModalRoutes';

const App = () => {
  const {authorized} = useSelector(state => state.auth);
  const {user: {userTag}, preloader} = useSelector(state => state.user);
  const location = useLocation();
  const background = location.state?.background;

  return (
    <BackgroundContext.Provider value={{background}}>
      <Preloader loading={preloader}/>
      <RootContainer>
        <Header>
          <NavBar menu={menu(userTag, authorized)} authorized={authorized}/>
        </Header>
        <Main>
          <MainContainer>
            <MainRoutes/>
          </MainContainer>
        </Main>
        <ModalRoutes/>
        {!authorized && <LoginPanel/>}
        <DialogWindow/>
      </RootContainer>
    </BackgroundContext.Provider>
  )
}

export default App;
