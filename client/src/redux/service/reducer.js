import {ACTIONS} from './action';

const init = {
  appBarWidth: 0,
}

export default (state = init, {type, payload}) => {

  switch (type) {
    case (String(ACTIONS.setAppBarWidth)):
      return {
        ...state,
        appBarWidth: payload.width
      }
    default:
      return state;
  }
}
