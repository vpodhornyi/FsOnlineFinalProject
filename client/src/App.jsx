import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useLocation} from "react-router-dom";

import {
    Preloader,
    DialogWindow,
    RootContainer,
    LoginPanel,
    Header,
    NavBar,
    Main,
    MainContainer,
} from "./components";
import {menu} from "./utils/menu";
import {BackgroundContext} from "./utils/context";
import MainRoutes from "./routes/MainRoutes";
import ModalRoutes from "./routes/ModalRoutes";
import {getChatsData} from "@redux/chat/selector";
import {ThemeContext} from "./utils/themeContext";

const App = () => {
    const [fontSize, setFontSize] = useState('3rem');
    const [color, setColor] = useState('rgb(29, 155, 240)');
    const [backgroundColor, setBackgroundColor] = useState('#ffffff');
    const themeValue = {fontSize, setFontSize, color, setColor, backgroundColor, setBackgroundColor};

    const {authorized} = useSelector((state) => state.auth);
    const {
        authUser: {userTag},
        preloader,
    } = useSelector((state) => state.user);
    const {isChatSelected, chatId} = useSelector(getChatsData);
    const location = useLocation();
    const background = location.state?.background;
    useEffect(() => {
        console.log(fontSize + ":" + color + ":" + backgroundColor)
    });
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
