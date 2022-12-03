export const getMessageData = state => {
  if (state) {
    const data = JSON.parse(JSON.stringify(state.message));

    return {
      isLoading: data.loading,
      isDetailLoading: data.detailLoading,
      chats: data.chats,
      chatData: data.chatData,
      activeId: data.activeId,
      isChatInfo: data.isChatInfo,
      message: data.message,
      showHeaderAvatar: data.showHeaderAvatar,
      chat: data.chat,
      messages: data.messages,
      newMessage: data.newMessages.find(v => v.chatId === data.chat.id) || ({chatId: data.chat.id, text: ''}),
    }
  }
}
