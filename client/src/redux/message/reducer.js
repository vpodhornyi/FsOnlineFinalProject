import {ACTIONS} from "./action";

const INIT_STATE = {
  message: '',
  navigationLoading: false,
  detailLoading: false,
  sendingMessage: false,
  isChatInfo: false,
  activeId: -1,
  chats: [
    {
      id: 1,
      title: 'Bob',
      users: [
        {
          id: 1,
          name: 'Bob',
          userTag: '@bob1234',
          email: 'bob@gmail.com',
          birthDate: '',
          bio: '',
          location: '',
          avatarImgUrl: '',
          headerImgUrl: '',
        }
      ]
    },
    {
      id: 3,
      title: 'Lily',
      users: [
        {
          id: 3,
          name: 'Lily',
          userTag: '@lily4535',
          email: 'cap@marvel.com',
          birthDate: '',
          bio: '',
          location: '',
          avatarImgUrl: '',
          headerImgUrl: '',
        }
      ]
    }
  ],
  grabbedUsers: [],
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
    case String(ACTIONS.navigationLoading):
      return {
        ...state,
        navigationLoading: !state.navigationLoading,
      };
    case String(ACTIONS.detailLoading):
      return {
        ...state,
        detailLoading: !state.detailLoading,
      };
    case String(ACTIONS.setMessage):
      const {id, text} = payload;
      state.chats.find(v => v.id === id).text = text;
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
    case String(ACTIONS.openChatInfo):
      return {
        ...state,
        isChatInfo: true,
      };
    case String(ACTIONS.closeChatInfo):
      return {
        ...state,
        isChatInfo: false,
      };
    default:
      return state;
  }
}
