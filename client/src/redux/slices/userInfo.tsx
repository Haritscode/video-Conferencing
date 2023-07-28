import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface userInfo{
    email:String,
    name:String,
    profileUrl:String
}
const initialState:userInfo={
    email:"",
    name:"",
    profileUrl:""
}
export const userProfile=createSlice({
    name:"user Profile",
    initialState,
    reducers:{
        setUserInfo:(state,action:PayloadAction<userInfo>)=>{
            return { ...state,...action.payload };
        },
        setlogOutUser:()=>{
            return {...initialState};
        }
    }
})
export const {setUserInfo,setlogOutUser}=userProfile.actions;
export default userProfile.reducer;