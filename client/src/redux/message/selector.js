export const getCurrentChat = state => {
  if (state) {
    const data = JSON.parse(JSON.stringify(state.message));
    const isChatSelected = data.activeId !== -1;
    return isChatSelected ? data.chats.find(v => v.id === data.activeId) : {};
  }
}

export const getMessageData = state => {
  if (state) {
    const data = JSON.parse(JSON.stringify(state.message));
    const isChatSelected = data.activeId !== -1;

    return {
      isNavigationLoading: data.navigationLoading,
      isDetailLoading: data.detailLoading,
      chats: data.chats,
      chatData: data.chatData,
      activeId: data.activeId,
      isChatSelected,
      isChatInfo: data.isChatInfo,
      message: data.message,
      showHeaderAvatar: data.showHeaderAvatar
    }
  }
}
