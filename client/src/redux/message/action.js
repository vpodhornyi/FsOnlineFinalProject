import {createActions} from '../utils';
import api, {URLS} from "@service/API";

const actions = createActions(
  {
    actions: ['SET_ACTIVE_ID', 'CLOSE_CHAT_INFO', 'OPEN_CHAT_INFO', 'RESET_ACTIVE_ID', 'NAVIGATION_LOADING',
      'DETAIL_LOADING', 'SEND_MESSAGE', 'SET_MESSAGE'],
    async: ["GET_CONVERSATION"],
  },
  {
    prefix: "message",
  }
);

export const ACTIONS = {
  ...actions.actions,
  ...actions.async,
}


export const getUsersRoutes = () => async dispatch => {
  try {
    dispatch(ACTIONS.navigationLoading())
    // await api.get()
    setTimeout(() => {
      dispatch(ACTIONS.navigationLoading());
    }, 500)

  } catch (err) {
    console.log('logout error - ', err);
  }
}

export const sendMessage = ({text, id}) => async dispatch => {
  try {
    console.log(text);
    // await api.get()

  } catch (err) {
    console.log('logout error - ', err);
  }
}

export const getConversation = ({id}) => async dispatch => {
  try {
    dispatch(ACTIONS.setActiveId({id}));
    dispatch(ACTIONS.detailLoading());
    // await api.get()
    setTimeout(() => {
      dispatch(ACTIONS.detailLoading());
    }, 500)

  } catch (err) {
    console.log('logout error - ', err);
  }
}
