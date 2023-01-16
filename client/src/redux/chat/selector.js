export const getChatsData = state => {
  if (state) {
    const data = JSON.parse(JSON.stringify(state.chat));
    const selectedChat = data.chats.find(v => v.id === data.chatId) || {};

    return {
      isChatLoading: data.loading,
      isChatsExist: data.chats.length,
      isChatSelected: data.chatId !== -1,
      chats: data.chats,
      totalPages: data.totalPages,
      chatId: data.chatId,
      selectedChat,
      countUnreadMessages: selectedChat?.lastMessage?.countUnreadMessages,
      message: selectedChat?.message,
      pageNumber: data.pageNumber,
      pageSize: data.pageSize,
      messages: [],
    }
  }
}

export const getMessagesData = state => {
  if (state) {
    const data = JSON.parse(JSON.stringify(state.message));

    return {
      messages: data.messages,
      pageNumberUp: data.pageNumberUp,
      pageNumberDown: data.pageNumberDown,
      pageSize: data.pageSize,
      totalPages: data.totalPages,
      lastSeenChatMessageId: data.lastSeenChatMessageId,
    }
  }
}
