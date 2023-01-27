import React from "react";
import {useSelector} from "react-redux";
import {useLocation} from "react-router-dom";
import {useResizeDetector} from 'react-resize-detector';
import {ThemeProvider} from "@emotion/react";

import {
  Preloader, RootContainer, LoginPanel, SnackBar,
  Header, NavBar, MobileNavBar, Main, MainContainer
} from "./components";
import {menu} from "./utils/menu";
import {BackgroundContext} from "./utils/context";
import MainRoutes from "./routes/MainRoutes";
import ModalRoutes from "./routes/ModalRoutes";
import {getChatsData} from "@redux/chat/selector";
import {createTheme} from "@mui/material/styles";
import {themeStyles} from "./utils/theme";

const App = () => {
  const {width, ref} = useResizeDetector();
  const {authorized} = useSelector(state => state.auth);
  const {authUser, preloader, customize} = useSelector(state => state.user);
  const theme = createTheme(themeStyles(customize.background, customize.color));
  const {isChatSelected, chatId} = useSelector(getChatsData);
  const location = useLocation();
  const background = location.state?.background;
  const mainMenu = menu(authUser.userTag, authorized, isChatSelected, authUser.countUnreadMessages, chatId)

  return (preloader ? <Preloader/> :
      <BackgroundContext.Provider value={{background}}>
        <ThemeProvider theme={theme}>
          <RootContainer ref={ref}>
            <Header>
              <NavBar
                user={authUser}
                menu={mainMenu}
                authorized={authorized}
              />
            </Header>
            <Main>
              <MainContainer>
                <MainRoutes
                  width={width}
                  authorized={authorized}
                  background={background}
                  location={location}/>
              </MainContainer>
            </Main>
            {!authorized && <LoginPanel/>}
            {authorized &&
              <MobileNavBar
                user={authUser}
                isChatSelected={isChatSelected}
                countUnreadMessages={authUser.countUnreadMessages}
                chatId={chatId}/>
            }
            <ModalRoutes authorized={authorized}/>
            <SnackBar/>
          </RootContainer>
        </ThemeProvider>
      </BackgroundContext.Provider>
  )
}

export default App;
