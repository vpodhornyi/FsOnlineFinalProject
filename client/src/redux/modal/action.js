import { createActions } from "../utils";

const actions = createActions(
  {
    actions: ["OPEN_MODAL", "CLOSE_MODAL"],
  },
  {
    prefix: "modal",
  }
);

export const ACTIONS = {
  ...actions.actions,
};

export const openModal = (data) => (dispatch) => {
  dispatch(ACTIONS.openModal(data));
};

export const closeModal = () => (dispatch) => {
  dispatch(ACTIONS.closeModal());
};
