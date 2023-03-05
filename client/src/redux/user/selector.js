export const getPersonalData = (state) => state.user.authUser;
export const getUserRecommendsState = (state) => state.user.recommends;
export const getIsPageableState = (state) => state.user.recommends.isPageable;
export const getUserLoadingState = (state) => state.user.loading;
export const getCustomizationTheme = (state) => state.user.customize;
