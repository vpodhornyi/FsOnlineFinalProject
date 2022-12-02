import {ACTIONS} from "./action";

const INIT_STATE = {
  message: '',
  loading: false,
  detailLoading: false,
  sendingMessage: false,
  messagesLoading: false,
  activeId: -1,
  grabbedUsers: [],
  chat: {},
  currentChat: {},
  messages: []
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
    case String(ACTIONS.getMessages.request):
      return {
        ...state,
        messagesLoading: true,
      };
    case String(ACTIONS.getMessages.success):
      return {
        ...state,
        messagesLoading: false,
        messages: [...payload.messages]
      };
    case String(ACTIONS.getMessages.fail):
      return {
        ...state,
        messagesLoading: false,
      };
    default:
      return state;
  }
}
