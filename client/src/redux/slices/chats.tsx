import { createSlice,PayloadAction } from "@reduxjs/toolkit";
const initialState:initialStateProps={
    requestList:[],
    userMessageList:[],
}
interface requestDataType{
    email:String,
    name:String,
    profile:String
}
interface initialStateProps{
    requestList:Array<any>,
    userMessageList:Array<any>
}
export const chatData=createSlice({
    name:"chats",
    initialState,
    reducers:{
        setRequests:(state,action:PayloadAction<Array<requestDataType>>)=>{
            state.requestList=action.payload
            return;
        }
    }
})
export const {setRequests}=chatData.actions;
export default chatData.reducer;