export const getChatsData = state => {
  if (state) {
    const data = JSON.parse(JSON.stringify(state.chats.chats));
    const selectedChat = data.chats.find(v => v.id === data.chatId) || {};

    return {
      isChatLoading: data.loading,
      isChatsExist: data.chats.length,
      // isChatSelected: data.chatId !== -1,
      isGroupChat: selectedChat?.users?.length === 2,
      chats: data.chats,
      // chatId: data.chatId,
      selectedChat,
    }
  }
}

export const getMessagesData = state => {
  if (state) {
    const data = JSON.parse(JSON.stringify(state.chats.messages));

    return {
      isMessagesLoading: data.loading,
      messages: data.messages,
    }
  }
}
