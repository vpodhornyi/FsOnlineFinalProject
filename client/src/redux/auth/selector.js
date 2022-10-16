export const getAuth = (state) => state.auth;
export const getPersonalData = (state) => state.auth.user;
export const getAccounts = (state) => state.auth.user.accounts;