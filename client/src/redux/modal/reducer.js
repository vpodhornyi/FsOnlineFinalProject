import { ACTIONS } from "./action";

const INIT = {
  open: false,
  activeId: null,
  typeModal: "",
};

export default (state = INIT, { payload, type }) => {
  const { id, typeModal } = payload ? payload : { id: null, typeModal: "" };
  switch (type) {
    case String(ACTIONS.closeModal):
      return { ...state, open: false, activeId: null, typeModal: "" };
    case String(ACTIONS.openModal):
      return { ...state, open: true, activeId: id, typeModal };
    default:
      return state;
  }
};
