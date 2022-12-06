import {ACTIONS} from "./action";

const init = {
  loading: false,
  messages: []
}

export default (state = init, {payload, type}) => {
  switch (type) {
    case String(ACTIONS.getMessages.request):
      return {
        ...state,
        loading: true,
      };
    case String(ACTIONS.getMessages.success):
      return {
        ...state,
        loading: false,
        messages: payload.messages
      };
    case String(ACTIONS.getMessages.fail):
      return {
        ...state,
        loading: false,
      };
    case String(ACTIONS.resetMessages):
      return {
        ...state,
        messages: []
      };
    default:
      return state;
  }
}
