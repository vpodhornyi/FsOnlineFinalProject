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
import {getChatsData} from '@redux/chat/selector';

const App = () => {
  const {authorized} = useSelector(state => state.auth);
  const {authUser: {userTag}, preloader} = useSelector(state => state.user);
  const {isChatSelected, chatId} = useSelector(getChatsData);
  const location = useLocation();
  const background = location.state?.background;

  return (preloader ? <Preloader/> :
      <BackgroundContext.Provider value={{background}}>
        <RootContainer>
          <Header>
            <NavBar menu={menu(userTag, authorized, isChatSelected, chatId)} authorized={authorized}/>
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
