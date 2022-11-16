export const getMessageData = state => {
  if (state) {
    const data = JSON.parse(JSON.stringify(state.message));
    const isChatSelected = data.activeId !== -1;

    return {
      isNavigationLoading: data.navigationLoading,
      isDetailLoading: data.detailLoading,
      conversations: data.conversations,
      conversationData: data.conversationData,
      user: isChatSelected ? data.conversations[data.activeId] : {},
      activeId: data.activeId,
      isChatSelected,
      isChatInfo: data.isChatInfo,
      message: data.message,
      showHeaderAvatar: data.showHeaderAvatar
    }
  }
}
