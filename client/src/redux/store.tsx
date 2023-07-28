import { configureStore } from "@reduxjs/toolkit";
import showLogInPopUp from "./slices/showLogInPopUp";
import userProfile from "./slices/userInfo";
import chats from "./slices/chats";
export const store=configureStore({
    reducer:{
        showLogInPopUp,
        userProfile,
        chats
    }
});

export type RootState=ReturnType<typeof store.getState>;
export type appDispatch=typeof store.dispatch;
