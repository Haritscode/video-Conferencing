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
const senderstatusReducer = (
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
const MessageReducer=(state:any,action:{type:String,payload:any})=>{
  switch(action.type){
    case "MESSAGES":
      return action.payload;
      break;
    case "NEW MESSAGE":
      if(state.length>0 && action.payload.sender===state[state.length-1].sender){
        let update=state[state.length-1];
        update={...update,msg:[...update.msg,action.payload.msg]}; 
        let data:any=[];
        state.map((item:any,count:number)=>{
          if(state.length-1>count){
            data.push(item);
          }
          else{
            data.push(update);
          }
        })        
        return data;
      }
      return [...state,{sendBy:action.payload.sender,name:action.payload.name,msg:[action.payload.msg],at:action.payload.createdAt}];
    default:
      return state;
  }
}
export {senderstatusReducer,initialState,MessageReducer};
