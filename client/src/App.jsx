import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useLocation} from "react-router-dom";
import {useResizeDetector} from 'react-resize-detector';

import {
  Preloader, RootContainer, LoginPanel, SnackBar,
  Header, NavBar, MobileNavBar, Main, MainContainer
} from "./components";
import {menu} from "./utils/menu";
import {BackgroundContext} from "./utils/context";
import MainRoutes from "./routes/MainRoutes";
import ModalRoutes from "./routes/ModalRoutes";
import {getChatsData} from "@redux/chat/selector";
import {ThemeContext} from "./utils/themeContext";

const App = () => {
  const {width, ref} = useResizeDetector();
  const {authorized} = useSelector(state => state.auth);
  const {authUser, preloader} = useSelector(state => state.user);
  const {isChatSelected, chatId} = useSelector(getChatsData);
  const location = useLocation();
  const background = location.state?.background;
  const mainMenu = menu(authUser.userTag, authorized, isChatSelected, authUser.countUnreadMessages, chatId)

  return (preloader ? <Preloader/> :
      <BackgroundContext.Provider value={{background}}>
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
      </BackgroundContext.Provider>
  )
}
    const [color, setColor] = useState('rgb(29, 155, 240)');
    const [backgroundColor, setBackgroundColor] = useState('#ffffff');
    const themeValue = {color, setColor, backgroundColor, setBackgroundColor};

    const {authorized} = useSelector((state) => state.auth);
    const {
        authUser: {userTag},
        preloader,
    } = useSelector((state) => state.user);
    const {isChatSelected, chatId} = useSelector(getChatsData);
    const location = useLocation();
    const background = location.state?.background;
    return preloader ? (
        <Preloader/>
    ) : (
        <BackgroundContext.Provider value={{background}}>
            <ThemeContext.Provider value={themeValue}>
                <RootContainer>
                    <Header>
                        <NavBar
                            menu={menu(userTag, authorized, isChatSelected, chatId)}
                            authorized={authorized}
                        />
                    </Header>
                    <Main>
                        <MainContainer>
                            <MainRoutes
                                authorized={authorized}
                                userTag={userTag}
                                background={background}
                                location={location}
                            />
                        </MainContainer>
                    </Main>
                    {!authorized && <LoginPanel/>}
                    <ModalRoutes authorized={authorized}/>
                </RootContainer>
            </ThemeContext.Provider>
        </BackgroundContext.Provider>
    );
};

export default App;
