import {ACTIONS} from "./action";

const INIT_STATE = {
  message: '',
  loading: false,
  detailLoading: false,
  sendingMessage: false,
  activeId: -1,
  grabbedUsers: [],
  chat: {},
  currentChat: {},
  chatData: [
    {
      key: 'AS32edd23',
      isAuth: true,
      text: 'Hello',
      userId: 2,
    },
    {
      key: 'LOjMH12H1',
      isAuth: false,
      text: 'Hi',
      userId: 1,
    },
    {
      key: 'erFRF5GrR',
      isAuth: true,
      text: 'How are you?',
      userId: 2,
    }
  ]
}

export default (state = INIT_STATE, {payload, type}) => {
  switch (type) {
    case String(ACTIONS.loadingStart):
      return {
        ...state,
        loading: true,
      };
    case String(ACTIONS.loadingEnd):
      return {
        ...state,
        loading: false,
      };
    case String(ACTIONS.detailLoading):
      return {
        ...state,
        detailLoading: !state.detailLoading,
      };
    case String(ACTIONS.setMessage):
      const {id, text} = payload;
      state.chats.find(v => v?.id === id).text = text;
      return {
        ...state,
      };
    case String(ACTIONS.setActiveId):
      return {
        ...state,
        activeId: payload.id,
        isChatInfo: false,
      };
    case String(ACTIONS.resetActiveId):
      return {
        ...state,
        activeId: -1,
        isChatInfo: false,
      };
    case String(ACTIONS.setChat):
      return {
        ...state,
        chat: payload?.chat,
      };
    default:
      return state;
  }
}
