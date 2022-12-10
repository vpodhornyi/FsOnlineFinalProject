export const getChatsData = state => {
  if (state) {
    const data = JSON.parse(JSON.stringify(state.chat));
    const selectedChat = data.chats.find(v => v.id === data.chatId) || {};

    return {
      isChatLoading: data.loading,
      isChatsExist: data.chats.length,
      isChatSelected: data.chatId !== -1,
      chats: data.chats,
      chatId: data.chatId,
      selectedChat,
      message: selectedChat?.message,
    }
  }
}
