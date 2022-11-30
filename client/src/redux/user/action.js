import {createActions} from '../utils';


const actions = createActions(
  {
    actions: [],
    async: ['GET_AUTH_USER'],
  },
  {
    prefix: "user",
  }
);

export const ACTIONS = {
  ...actions.actions,
  ...actions.async,
}

export const getAuthUser = () => async (dispatch) => {
  try {
    dispatch(ACTIONS.getAuthUser.request);
    const data = await api.get(URLS.USERS.ROOT);
    dispatch(ACTIONS.getAuthUser.success(data));

  } catch (e) {
    dispatch(ACTIONS.getAuthUser.fail(e));
  }
}
