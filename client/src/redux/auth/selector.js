export const getLoginName = (state) => state.auth.loginName;
export const getAuthorized = (state) => state.auth.authorized;
export const getPersonalData = (state) => {
  if (state) {
   return state.auth.user;
  }
}

