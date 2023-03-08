import { ACTIONS } from "./action";

const init = {
  preloader: false,
  authUser: {},
  recommends: {
    data: [],
    pageNumber: 0,
    pageSize: 2,
    isPageable: true,
  },
  error: "",
  customize: {},
  stompSubscribeId: "",
  loading: false,
};

export default (
  state = JSON.parse(JSON.stringify(init)),
  { payload, type }
) => {
  switch (type) {
    case String(ACTIONS.clearUserRecommends.success):
      return {
        ...state,
        recommends: {
          data: payload,
          pageNumber: 0,
          pageSize: state.recommends.pageSize,
          isPageable: true,
        },
      };
    case String(ACTIONS.clearUserRecommends.fail):
      return {
        ...state,
        error: payload,
      };
    case String(ACTIONS.getUserRecommends.request):
      return {
        ...state,
        preloader: false,
        loading: true,
      };
    case String(ACTIONS.getUserRecommends.success):
      return {
        ...state,
        recommends: {
          data: [...state.recommends.data, ...payload],
          pageNumber: state.recommends.pageNumber + 1,
          pageSize: state.recommends.pageSize,
          isPageable: state.recommends.pageNumber !== 2,
        },
        loading: false,
      };
    case String(ACTIONS.getUserRecommends.fail):
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case String(ACTIONS.getAuthUser.request):
      return {
        ...state,
        preloader: payload,
      };
    case String(ACTIONS.getAuthUser.success):
      return {
        ...state,
        authUser: payload,
        customize: payload?.customStyle,
        preloader: false,
      };
    case String(ACTIONS.getAuthUser.fail):
      return {
        ...state,
        preloader: false,
        error: payload,
      };
    case String(ACTIONS.setCustomize):
      return {
        ...state,
        customize: { ...state.customize, ...payload },
      };
    case String(ACTIONS.updateUserCustomStyle):
      state.authUser.customStyle = payload;
      return {
        ...state,
      };
    case String(ACTIONS.updateCountUnreadMessages):
      const { countUnreadAllChatMessages } = payload;
      if (countUnreadAllChatMessages || countUnreadAllChatMessages === 0) {
        state.authUser.countUnreadMessages = countUnreadAllChatMessages;
      }
      return {
        ...state,
        preloader: false,
        error: payload,
      };
    case String(ACTIONS.setStompSubscribeId):
      return {
        ...state,
        stompSubscribeId: payload,
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
