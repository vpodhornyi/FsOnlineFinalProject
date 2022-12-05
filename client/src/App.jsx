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

  return (preloader ? <Preloader/> :
      <BackgroundContext.Provider value={{background}}>
        <RootContainer>
          <Header>
            <NavBar menu={menu(userTag, authorized)} authorized={authorized}/>
          </Header>
          <Main>
            <MainContainer>
              <MainRoutes authorized={authorized} userTag={userTag} background={background} location={location}/>
            </MainContainer>
          </Main>
          {!authorized && <LoginPanel/>}
          <DialogWindow/>
          <ModalRoutes authorized={authorized}/>
        </RootContainer>
      </BackgroundContext.Provider>
  )
}

export default App;
