import {createActions} from '../utils';

const actions = createActions(
  {
    actions: ['OPEN_DIALOG', 'CLOSE_DIALOG'],
  },
  {
    prefix: 'dialog',
  }
)

export const ACTIONS = {
  ...actions.actions,
}

const openDialog = (Component, props) => dispatch => {
  dispatch(ACTIONS.openDialog({Component, props}));
}

const closeDialog = () => dispatch => {
  dispatch(ACTIONS.closeDialog());
}

export const DIALOG_ACTIONS = {
  openDialog,
  closeDialog,
}
