import {ACTIONS} from "./action";

const init = {
  selectedChatId: -1,
  messages: []
};


export default (state = init, {payload, type}) => {

  switch (type) {
    case String(ACTIONS.setMessages):
      return {
        ...payload.messages,
      };
    case String(ACTIONS.addPreviousMessages):
      return {
        ...[...payload.messages, ...state.messages],
      };
    case String(ACTIONS.addNewMessage):
      return {
        ...[...state.messages, payload.message],
      };
    case String(ACTIONS.updateOrAddNewMessage): {
      if (payload.message.chatId === state.selectedChatId) {
        const index = state.messages.findIndex(m => m.key === payload.message.oldKey);
        if (index === -1) {
          state = [...state, payload.message];
        } else {
          state.splice(index, 1, payload.message);
        }
      }
      return {
        ...state,
      };
    }
    case String(ACTIONS.updateMessageSeen): {
      if (state.length) {
        const find = state.find(m => m.id === payload?.messageId);
        if (find) {
          if (find.isPrivateChat) {
            find.IsMessageSeen = payload.seen;
          }

          if (find.isGroupChat) {
            const i = find.messagesSeen?.findIndex(s => s.id === payload.id);

            if (!i) {
              find.messagesSeen = [payload];
            } else if (i === -1) {
              find.messagesSeen.push(payload)
            } else {
              find.messagesSeen.splice(i, 1, payload);
            }
          }
        }
      }
      return {
        ...state,
      };
    }
    case String(ACTIONS.resetMessages):
      return {
        ...state,
        messages: [],
      };
    default:
      return state;
  }
};
