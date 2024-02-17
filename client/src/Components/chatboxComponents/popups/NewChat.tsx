import React, { useEffect, useReducer, useState } from 'react'
import styles from './newChat.module.scss';
import Requests from './Requests';
import { useSelector } from 'react-redux';
import {chatReducer,intialState} from '@/reducer/chats.reducer'
import SendRequestCard from './card/RequestsCard';
import socket from '@/config/socket.io';
import axios from 'axios';
interface propsType{
  showPopup:boolean,
  setShowPopup:Function
}
export default function NewChat({showPopup,setShowPopup}:propsType) {  
  const [state,dispatch]=useReducer(chatReducer,intialState);
  const userInfo=useSelector((state:any)=>state.userProfile);  
  const onKeyDown=async(e:any)=>{            
      try{
          const result=await axios.get(`http://localhost:4000/chats/findUser?find=${state.searchUser}`,{withCredentials:true});
          dispatch({type:"INVITEDUSERINFO",payload:{...result.data}})
                    
      }
      catch(err){
        console.log(err);
        dispatch({type:"INVITEDUSERINFO",payload:{}})
      }
  }
  console.log();
  
  return (
    <>
      <div className={styles.findUser_requests} style={showPopup?{}:{maxHeight:"0",padding:"0"}}>
        <input type="text" className={styles.searchUser} placeholder={"Start a new Chat"} value={state.searchUser} onChange={e=>dispatch({type:"SEARCHUSER",payload:e.target.value})} onKeyDown={onKeyDown}/>
        <ol className={styles.searching_user_list} style={state.invitedUserInfo.email?{}:{display:"none"}}>
            <SendRequestCard name={state.invitedUserInfo.name} email={state.invitedUserInfo.email} profileUrl={state.invitedUserInfo.profileUrl} buttonType={state.invitedUserInfo.type} dispatch={dispatch} state={state}/>
        </ol>
        <Requests state={state} dispatch={dispatch}/>
      </div>
    </>
  )
}
