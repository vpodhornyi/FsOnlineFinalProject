import {ACTIONS} from "./action";

const init = {
  pageNumberUp: 0,
  pageNumberDown: 0,
  pageSize: 30,
  lastSeenChatMessageId: 0,
  totalPages: 0,
  chatId: 0,
  messages: []
};

export default (state = init, {payload, type}) => {

  switch (type) {
    case String(ACTIONS.setMessages):
      const {messages, lastSeenChatMessageId, chatId, totalPages} = payload;
      return {
        ...state,
        messages,
        lastSeenChatMessageId,
        chatId,
        totalPages,
      };
    case String(ACTIONS.addUpMessages): {
      const newMessages = payload.messages.filter(m => !state.messages.find(ms => ms.id === m.id));
      return {
        ...state,
        messages: [...newMessages, ...state.messages],
      };
    }
    case String(ACTIONS.addDownMessages): {
      const newMessages = payload.messages.filter(m => !state.messages.find(ms => ms.id === m.id));
      return {
        ...state,
        messages: [...state.messages, ...newMessages],
      };
    }
    case String(ACTIONS.addNewMessage):
      if (state.messages.length > state.pageSize) {
        state.messages.splice(0, 1);
      }
      return {
        ...state,
        messages: [...state.messages, payload],
      };
    case String(ACTIONS.updateOrAddNewMessage): {
      const chatId = state.chatId;
      if (chatId && (chatId === payload.chatId)) {
        const index = state.messages.findIndex(m => m.key === payload.oldKey);
        if (index === -1) {
          state.messages = [...state.messages, payload];
          if (state.messages.length > state.pageSize) {
            state.messages.splice(0, 1);
          }
        } else {
          state.messages.splice(index, 1, payload);
        }
      }
      return {
        ...state,
      };
    }
    case String(ACTIONS.updateMessageOwnerSeen): {
      if (state.messages.length) {
        const find = state.messages.find(m => m.id === payload?.messageId);
        if (find) {
          if (find.isPrivateChat) {
            find.isMessageSeen = payload.seen;
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
    case String(ACTIONS.updateForeignerMessageSeen): {
      if (state.messages.length) {
        const find = state.messages.find(m => m.id === payload.messageId);
        if (find) {
          find.isMessageSeen = true;
        }
      }
    }
      return {
        ...state,
      };
    case String(ACTIONS.leaveChatNotification): {
      if (state.chatId === payload.chatId) {
        state.messages.push(payload);
      }
    }
      return {
        ...state,
      };
    case String(ACTIONS.addUsersNotification): {
      if (state.chatId === payload.chatId) {
        state.messages.push(payload);
      }
    }
      return {
        ...state,
      };
    case String(ACTIONS.deleteMessage): {
      const index = state.messages.findIndex(m => m.id === payload.messageId);
      if (index !== -1) {
        state.messages.splice(index, 1);
      }
    }
      return {
        ...state,
      };
    case String(ACTIONS.setPageNumberUp):
      return {
        ...state,
        pageNumberUp: payload
      };
    case String(ACTIONS.setPageNumberDown):
      return {
        ...state,
        pageNumberDown: payload
      };
    case String(ACTIONS.resetMessages):
      return {
        ...state,
        messages: [],
      };
    case String(ACTIONS.resetData):
      state = init;
      return {
        ...state,
      };
    default:
      return state;
  }
};
