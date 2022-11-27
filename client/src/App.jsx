import React, {createRef, useEffect} from "react";
import {useSelector} from "react-redux";
import {useRoutes, Routes, Route, useNavigation, useNavigate, Navigate} from "react-router-dom";

import {
  PrimaryColumn, Preloader, DialogWindow, RootContainer, ColumnWrapper, LoginPanel,
  Header, AppBar, Main, MainContainer, SectionNavigation, SectionDetails
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

const App = () => {
  const {authorized, loading, user: {userTag}} = useSelector(state => state.auth);
  // const Routes = () => useRoutes(routes(userTag, authorized));

  return (
    <RootContainer>
      <Header>
        <AppBar menu={menu(userTag, authorized)} authorized={authorized}/>
      </Header>
      <Main>
        <MainContainer>
          <Routes>
            <Route path='/' element={<Navigate to={'home'}/>}/>
            <Route path='home' element={<PrimaryColumn/>}/>
            <Route path='explore' element={<PrimaryColumn/>}/>
            <Route path='notifications' element={<PrimaryColumn/>}/>
            <Route path='bookmarks' element={<PrimaryColumn/>}/>
            <Route path='lists' element={<PrimaryColumn/>}/>
            <Route path={`${userTag}`} element={<PrimaryColumn/>}/>

            <Route path='messages' element={<SectionNavigation Body={Messages}/>}>
              <Route index element={<SectionDetails Body={SelectMessage}/>}/>
              <Route path=':id' element={<SectionDetails Body={Chat}/>}/>
              <Route path=':id/info' element={<SectionDetails Body={ChatInfo}/>}/>
              <Route path='compose' element={<DialogNewMessage open={true}/>}/>
            </Route>

            <Route path=':user_tag' element={<>Other user</>}/>
            <Route path=':user_tag/*' element={<>Not Found PAGE</>}/>
          </Routes>
        </MainContainer>
      </Main>
      <DialogWindow/>
      {!authorized && <LoginPanel/>}
    </RootContainer>
  )
}

export default App;
