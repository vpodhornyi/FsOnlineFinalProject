export const getChatsData = state => {
  if (state) {
    const data = JSON.parse(JSON.stringify(state.chat));
    const selectedChat = data.chats.find(v => v.id === data.chatId) || {};

    return {
      isChatLoading: data.loading,
      isChatsExist: data.chats.length,
      isChatSelected: data.chatId !== -1,
      isGroupChat: selectedChat?.users?.length !== 2,
      chats: data.chats,
      chatId: data.chatId,
      selectedChat,
      newText: selectedChat?.newText,
    }
  }
}
