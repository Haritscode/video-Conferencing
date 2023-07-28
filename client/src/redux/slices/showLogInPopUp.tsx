import { createSlice , PayloadAction} from "@reduxjs/toolkit";
interface initialState{
    show:boolean,
    type:string
}
const initialState:initialState={
    show:false,
    type:""
}
export const showLogin=createSlice({
    name:"showLoginPopUp",
    initialState,
    reducers:{
        isShowLogInPopUp:(state,action:PayloadAction<boolean>)=>{
            return {...initialState,
                show:action.payload
            }
        },
        popUptype:(state,action:PayloadAction<string>)=>{
            return { ...state,
                type:action.payload
            }
        }
    }
})
export const { isShowLogInPopUp,popUptype }=showLogin.actions;

export default showLogin.reducer; 