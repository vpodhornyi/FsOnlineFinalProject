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

export const openDialog = (Component, props) => dispatch => {
  dispatch(ACTIONS.openDialog({Component, props}));
}

export const closeDialog = () => dispatch => {
  dispatch(ACTIONS.closeDialog());
}
