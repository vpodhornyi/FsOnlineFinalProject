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
  Lists, UserProfile,
} from "./pages";
import NavigationHeader from './pages/Messages/components/Navigation/Header';
import DetailHeader from './pages/Messages/components/ChatInfo/Header';
import WelcomeToInbox from './pages/Messages/components/WelcomeToInbox';
import {routes} from './routes';
import {menu} from './routes';
import Box from "@mui/material/Box";

const App = () => {
  const {authorized, loading, user: {userTag}} = useSelector(state => state.auth);
  const {fromLocation} = useSelector(state => state.service);
  // const Routes = () => useRoutes(routes(userTag, authorized));
  const location = useLocation();
  const from = location.state?.from;

  return (
    <RootContainer>
      <Header>
        <AppBar menu={menu(userTag, authorized)} authorized={authorized}/>
      </Header>
      <Main>
        <MainContainer>
          <Routes location={from || location}>
            <Route path='home' element={<PrimaryColumn/>}/>
            <Route path='explore' element={<PrimaryColumn/>}/>
            <Route path='notifications' element={<PrimaryColumn/>}/>
            <Route path='bookmarks' element={<PrimaryColumn/>}/>
            <Route path='lists' element={<PrimaryColumn/>}/>
            <Route path={`${userTag}`} element={<PrimaryColumn/>}/>

            <Route path='/messages' element={<SectionNavigation Body={Messages}/>}>
              <Route index element={<SectionDetails Body={SelectMessage}/>}/>
              <Route path=':id' element={<SectionDetails Body={Chat}/>}/>
              <Route path=':id/info' element={<SectionDetails Body={ChatInfo}/>}/>
            </Route>

            <Route path=':user_tag' element={<>Other user</>}/>
            <Route path=':user_tag/*' element={<>Not Found PAGE</>}/>
          </Routes>
        </MainContainer>
      </Main>
      <Routes>
        <Route path={`/i/flow/:id`} element={<ModalPage/>}/>
        <Route path={`/messages/compose`} element={<DialogNewMessage/>}/>
        <Route path={`*`} element={<></>}/>
      </Routes>
      <DialogWindow/>
      {!authorized && <LoginPanel/>}
    </RootContainer>
  )
}

export default App;
