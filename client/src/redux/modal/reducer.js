import { ACTIONS } from "./action";

const INIT = {
  open: false,
  activeId: null,
  activeUrl: "",
  typeModal: "",
};

export default (state = INIT, { payload, type }) => {
  const { id, typeModal,activeUrl } = payload ? payload : { id: null, typeModal: "" ,activeUrl:""};
  switch (type) {
    case String(ACTIONS.closeModal):
      return { ...state, open: false, activeId: null, typeModal: "",activeUrl:"" };
    case String(ACTIONS.openModal):
      return { ...state, open: true, activeId: id, typeModal,activeUrl };
    default:
      return state;
  }
};
