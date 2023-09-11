import { createSlice,PayloadAction } from "@reduxjs/toolkit";
const initialState:initialStateProps={
    requestList:[],
    userMessageList:[],
    activeChat:{email:""}
}
interface activeChat{
    email:String
}
interface requestDataType{
    email:String,
    name:String,
    profile:String
}
interface initialStateProps{
    requestList:Array<any>,
    userMessageList:Array<any>
    activeChat:activeChat
}
export const chatData=createSlice({
    name:"chats",
    initialState,
    reducers:{
        setRequests:(state,action:PayloadAction<Array<requestDataType>>)=>{
            state.requestList=action.payload
            return;
        },
        setActiveChat:(state,action:PayloadAction<activeChat>)=>{
            state.activeChat=action.payload
            return;
        }
    }
})
export const {setRequests,setActiveChat}=chatData.actions;
export default chatData.reducer;