import {ACTIONS} from "./action";
import moment from "moment";

const init = {
  loading: false,
  pageNumber: 0,
  pageSize: 50,
  chatId: -1,
  chats: [],
  messages: [],
  onBottom: false,
}

export default (state = init, {payload, type}) => {
  switch (type) {
    case String(ACTIONS.setPageNumber):
      return {
        ...state,
        pageNumber: payload.pageNumber,
      };
    case String(ACTIONS.setNewChat):
      state.chats = [payload.entity, ...state.chats]
      return {...state};
    case String(ACTIONS.addNewChat):
      const {oldKey, chatData} = payload;
      const index = state.chats.findIndex(v => v.key === oldKey);
      state.chats[index] = chatData;
      return {...state};
    case String(ACTIONS.setMessage):
      const {chatId, text} = payload;
      const chat = state.chats.find(v => v.id === chatId);
      chat.message = text;
      return {
        ...state,
      };
    case String(ACTIONS.addExistChat):
      const isExistChat = state.chats.find(v => v.id === payload?.chat?.id);
      if (!isExistChat) state.chats = [payload.chat, ...state.chats];
      return {
        ...state,
      };
    case String(ACTIONS.setMessages):
      return {
        ...state,
        messages: payload.messages,
      };
    case String(ACTIONS.addPreviousMessages):
      return {
        ...state,
        messages: [...payload.messages, ...state.messages],
      };
    case String(ACTIONS.addNewMessage):
      return {
        ...state,
        messages: [...state.messages, payload.message],
      };
    case String(ACTIONS.updateOrAddNewMessage): {
      if (payload.message.chatId === state.chatId) {
        const index = state.messages.findIndex(m => m.key === payload.message.oldKey);
        if (index === -1) {
          state.messages = [...state.messages, payload.message];
        } else {
          state.messages.splice(index, 1, payload.message);
        }
      }
      return {
        ...state,
      };
    }
    case String(ACTIONS.updateMessageSeen): {
      if (state.messages.length) {
        const find = state.messages.find(m => m.id === payload?.seen?.messageId);
        if (find && payload.seen) {
          if (find.isPrivateChat) {
            find.messageSeen = payload.seen;
          }

          if (find.isGroupChat) {
            const i = find.messagesSeen?.findIndex(s => s.id === payload.seen.id);

            if (!i) {
              find.messagesSeen = [payload.seen];
            } else if (i === -1) {
              find.messagesSeen.push(payload.seen)
            } else {
              find.messagesSeen.splice(i, 1, payload.seen);
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
    case String(ACTIONS.setChatId):
      return {
        ...state,
        chatId: payload.chatId,
      };
    case String(ACTIONS.resetChatId):
      return {
        ...state,
        chatId: -1,
      };
    case String(ACTIONS.getChats.request):
      return {
        ...state,
        loading: true,
      };
    case String(ACTIONS.getChats.success):
      return {
        ...state,
        loading: false,
        chats: payload.chats,
        showChats: payload.chats,
      };
    case String(ACTIONS.getChats.fail):
      return {
        ...state,
        loading: false,
      };
    case String(ACTIONS.setLastChatAction):
      const {actionData} = payload;
      const existChat = state.chats.find(ch => ch.id === actionData.chatId);
      if (existChat) {
        existChat.lastMessage = actionData;
        state.chats.sort((a, b) => {
          return !!a.lastMessage && !!b.lastMessage ? new Date(b.lastMessage.createdAt) - new Date(a.lastMessage.createdAt) : 0
        })
      }
      return {
        ...state,
      };
    case String(ACTIONS.resetData):
      state = init;
      return {
        ...state,
      };
    default:
      return state;
  }
}
