import React, {createRef, useEffect} from "react";
import {useSelector} from "react-redux";
import {useRoutes, useLocation, Routes, Route, useNavigation, useNavigate, Navigate} from "react-router-dom";

import {
  PrimaryColumn, Preloader, DialogWindow, RootContainer, ColumnWrapper, LoginPanel,
  Header, AppBar, Main, MainContainer, SectionNavigation, SectionDetails, ModalPage
} from "./components";
import {
  Root, Home, Explore, Notifications, Messages, Chat,
  SelectMessage, DialogNewMessage, ChatInfo, Bookmarks,
  Lists, UserProfile, Login
} from "./pages";
import NavigationHeader from './pages/Messages/components/Navigation/Header';
import DetailHeader from './pages/Messages/components/ChatInfo/Header';
import WelcomeToInbox from './pages/Messages/components/WelcomeToInbox';
import {routes} from './routes';
import {menu} from './routes';
import {PATH} from "./utils/constants";

const App = () => {
  const {authorized, loading, user: {userTag}} = useSelector(state => state.auth);
  const location = useLocation();
  const background = location.state?.background;

  return (
    <RootContainer>

      {/*Modal page routes*/}
      <Routes>
        <Route path={PATH.LOGIN} element={<Login background={background}/>}/>
        <Route path={PATH.SING_UP} element={<Login background={background}/>}/>
        <Route path={PATH.MESSAGES.COMPOSE} element={<DialogNewMessage/>}/>
        <Route path={PATH.ALL} element={<></>}/>
      </Routes>

      <Header>
        <AppBar menu={menu(userTag, authorized)} authorized={authorized}/>
      </Header>
      <Main>
        <MainContainer>

          {/*Main container routes*/}
          <Routes location={background || location}>
            <Route path={PATH.HOME} element={<PrimaryColumn/>}/>
            <Route path={PATH.EXPLORE} element={<PrimaryColumn/>}/>
            <Route path={PATH.NOTIFICATIONS} element={<PrimaryColumn/>}/>
            <Route path={PATH.BOOKMARKS} element={<PrimaryColumn/>}/>
            <Route path={PATH.LISTS} element={<PrimaryColumn/>}/>

            {/*{current user page}*/}
            <Route path={PATH.ROOT + userTag} element={<PrimaryColumn/>}/>

            <Route path={PATH.MESSAGES.ROOT} element={<SectionNavigation Body={Messages}/>}>
              <Route index element={<SectionDetails Body={SelectMessage}/>}/>
              <Route path={PATH.MESSAGES.CHAT} element={<SectionDetails Body={Chat}/>}/>
              <Route path={PATH.MESSAGES.CHAT_INFO} element={<SectionDetails Body={ChatInfo}/>}/>
            </Route>

            <Route path={PATH.USER_PROFILE} element={<>Other user</>}/>
            <Route path={PATH.NO_MATCHES} element={<>Not Found PAGE</>}/>
          </Routes>

        </MainContainer>
      </Main>
      <DialogWindow/>
      {!authorized && <LoginPanel/>}
    </RootContainer>
  )
}

export default App;
