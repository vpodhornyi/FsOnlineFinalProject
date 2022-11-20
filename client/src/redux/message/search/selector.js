export const getMessageSearchData = state => {
  if (state) {
    const data = JSON.parse(JSON.stringify(state.messageSearch));

    return {
      text: data.text,
      isSearchUserLoading: data.searchUserLoading,
      foundUsers: data.foundUsers,
      grabbedUsers: data.grabbedUsers,
    }
  }
}
