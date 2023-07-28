interface initalStateType {
    isTyping: boolean;
    countUnseenMessages: number;
    isMessageReceived: boolean;
    isMessageSeen: boolean;
}
const initialState: initalStateType = {
    isTyping: false,
    countUnseenMessages: 100,
    isMessageReceived: true,
    isMessageSeen: false,
};
const MessagesReducer = (
    state: initalStateType,
    action: { type: String; payload: any }
  ) => {
    switch (action.type) {
      case "COUNTUNSEENMESSAGES":
        return { ...state, countUnseenMessages: action.payload };
      case "ISTYPING":
        return { ...state, isTyping: action.payload };
      case "ISMESSAGERECEIVED":
        return { ...state, isMessageRecieved: action.payload };
      case "ISMESSAGESEEN":
        return { ...state, isMessageSeen: action.payload };
      default:
        return state;
    }
};
export {MessagesReducer,initialState};
