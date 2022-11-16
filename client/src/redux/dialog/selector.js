export const getDialogState = state => JSON.parse(JSON.stringify(state.dialog));
export const getDialogComponent = state => state.dialog.Component;
