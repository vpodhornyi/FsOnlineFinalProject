import {ACTIONS} from "./action";

const init = {
  open: false,
  duration: 5000,
  vertical: 'bottom',
  horizontal: 'center',
  message: '',
}

export default (state = init, {payload, type}) => {
  switch (type) {
    case String(ACTIONS.open):
      if (payload?.message) {
        state.message = payload.message;
        state.open = true;
      }
      return {
        ...state,
      };
    case String(ACTIONS.close):
      state = init;
      return {
        ...state,
        open: false,
        message: '',
      };
    default:
      return state
  }
}
