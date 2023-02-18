import {ACTIONS} from "./action";

const INIT = {
  open: false,
};

export default (state = INIT, {type}) => {

  switch (type) {
    case String(ACTIONS.closeDialog):
      return {
        ...state,
        open: false,
      };
    case String(ACTIONS.openDialog):
      return {
        ...state,
        open: true,
      };
    default:
      return state;
  }
};
