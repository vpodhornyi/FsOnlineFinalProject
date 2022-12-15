import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useLocation} from "react-router-dom";
import {Client} from "@stomp/stompjs";
import {ACTIONS} from './redux/message/action.js';
import wsConfig from './utils/websocketsConfig.json';

import {
    Preloader, DialogWindow, RootContainer, LoginPanel,
    Header, NavBar, Main, MainContainer
} from "./components";
import {menu} from './utils/menu';
import {BackgroundContext} from "./utils/context";
import MainRoutes from './routes/MainRoutes';
import ModalRoutes from './routes/ModalRoutes';
import {getStompCient} from "./redux/message/selector";


const App = () => {
    const {authorized} = useSelector(state => state.auth);
    const {user: {userTag}, preloader} = useSelector(state => state.user);
    const location = useLocation();
    const background = location.state?.background;
    const dispatch = useDispatch();
    const stompClient = useSelector(getStompCient);

    const messageReceived = (msg) => {
                        if (msg.body) {
                    const jsonBody = JSON.parse(msg.body);
                    if (jsonBody.message) {
                        alert(`messageReceived, ${jsonBody.message}`);
                    }
                }

    }
    const messageSent = (msg) => {
                        if (msg.body) {
                    const jsonBody = JSON.parse(msg.body);
                    if (jsonBody.message) {
                        alert(`messageSent, ${jsonBody.message}`);
                    }
                }

    }
    const tweetSent = (msg) => {
                        if (msg.body) {
                    const jsonBody = JSON.parse(msg.body);
                    if (jsonBody.message) {
                        alert(`tweetSent, ${jsonBody.message}`);
                    }
                }

    }
    const tweetCommented = (msg) => {
                        if (msg.body) {
                    const jsonBody = JSON.parse(msg.body);
                    if (jsonBody.message) {
                        alert(`tweetCommented, ${jsonBody.message}`);
                    }
                }

    }
    const tweetRetweeted = (msg) => {
                        if (msg.body) {
                    const jsonBody = JSON.parse(msg.body);
                    if (jsonBody.message) {
                        alert(`tweetRetweeted, ${jsonBody.message}`);
                    }
                }

    }
    const tweetLiked = (msg) => {
                        if (msg.body) {
                    const jsonBody = JSON.parse(msg.body);
                    if (jsonBody.message) {
                        alert(`tweetLiked, ${jsonBody.message}`);
                    }
                }

    }

    useEffect(() => {
        if (stompClient) return;
        const onConnected = () => {
            client.subscribe(wsConfig.messageReceived, messageReceived);
            client.subscribe(wsConfig.messageSent, messageSent);
            client.subscribe(wsConfig.tweetSent, tweetSent);
            client.subscribe(wsConfig.tweetCommented, tweetCommented);
            client.subscribe(wsConfig.tweetRetweeted, tweetRetweeted);
            client.subscribe(wsConfig.tweetLiked, tweetLiked);
        }
        const onDisconnected = () => {
            console.log("ws disconnected")
        }
        const client = new Client({
            brokerURL: wsConfig.SOCKET_URL,
            reconnectDelay: 5000,
            heartbeatIncoming: 2000,
            heartbeatOutgoing: 2000,
            onConnect: onConnected,
            onDisconnect: onDisconnected
        });
        stompClient.activate();
        dispatch(ACTIONS.setStompClient(client));
    }, []);


    return (preloader ? <Preloader/> :
            <BackgroundContext.Provider value={{background}}>
                <RootContainer>
                    <Header>
                        <NavBar menu={menu(userTag, authorized)} authorized={authorized}/>
                    </Header>
                    <Main>
                        <MainContainer>
                            <MainRoutes authorized={authorized} userTag={userTag} background={background}
                                        location={location}/>
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
