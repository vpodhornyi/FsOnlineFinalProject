import {ACTIONS} from "./action";

const init = {
  newMessages: [],
}

export default (state = init, {payload, type}) => {
  switch (type) {
    case String(ACTIONS.setNewMessage):
      const {chatId, text} = payload;
      const chat = state.newMessages.find(v => v?.chatId === chatId);
      if (chat) chat.text = text;
      else state.newMessages.push(payload);

      return {
        ...state,
      };
    case String(ACTIONS.sendMessage.request):
      return {
        ...state,
        sendingMessage: true,
      };
    case String(ACTIONS.sendMessage.success):
      state.messages.push(payload.newMessage)
      return {
        ...state,
        sendingMessage: false,
        messages: state.messages
      };
    case String(ACTIONS.sendMessage.fail):
      return {
        ...state,
        sendingMessage: false,
      };
    default:
      return state;
  }
}
