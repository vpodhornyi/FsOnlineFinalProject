import { ACTIONS } from "./action";

const INIT = {
  // loading: false,
  open: false,
  // Component: "",
  // props: {},
};

export default (state = INIT, {payload, type}) => {
  // const { payload, type } = action;
  // const { loading, Component, props } = payload
  //   ? payload
  //   : {
  //       loading: false,
  //       Component: "",
  //       props: {},
  //     };

  switch (type) {
    case String(ACTIONS.closeDialog):
      return {
        ...state,
        open: false,
        // props: {},
      };
    case String(ACTIONS.openDialog):
      return {
        ...state,
        open: true,
        // Component,
        // props: props,
      };
    default:
      return state;
  }
};
