import React, { useEffect, useReducer, useState } from 'react'
import styles from './newChat.module.scss';
import Requests from './Requires';
import { useSelector } from 'react-redux';
import {chatReducer,intialState} from '@/reducer/chats.reducer'
import RequestsCard from './card/RequestsCard';
import socket from '@/config/socket.io';
interface propsType{
  showPopup:boolean,
  setShowPopup:Function
}
export default function NewChat({showPopup,setShowPopup}:propsType) {  
  const [state,dispatch]=useReducer(chatReducer,intialState);
  const userInfo=useSelector((state:any)=>state.userProfile)  
  
  const onKeyDown=async(e:any)=>{
    if(e.key==="Enter"){
      try{
        socket.emit("findUser",userInfo.email,state.searchUser,(response:any)=>{
          if(response.status===404)
          {
            console.log("User Not Found");
            
          }
          else if(response.status===500){
            console.log("some internal server error");
            
          }
          else if(response.status===200)
          {            
            dispatch({type:"INVITEDUSERINFO",payload:{...response.data,type:response.type}})
          }
        })
      }
      catch(err){
        console.log(err);
        
        dispatch({type:"INVITEDUSERINFO",payload:{}})
      }
    }
  }  
  console.log(state);
  
  return (
    <>
      <div className={styles.findUser_requests} style={showPopup?{}:{maxHeight:"0px"}}>
        <input type="text" className={styles.searchUser} placeholder={"Start a new Chat"} value={state.searchUser} onChange={e=>dispatch({type:"SEARCHUSER",payload:e.target.value})} onKeyDown={onKeyDown}/>
        <ol className={styles.searching_user_list} style={state.invitedUserInfo.email?{}:{display:"none"}}>
            <RequestsCard type={"send"} name={state.invitedUserInfo.name} email={state.invitedUserInfo.email} profileUrl={state.invitedUserInfo.pr} buttonType={state.invitedUserInfo.type} dispatch={dispatch} state={state}/>
        </ol>
        <Requests state={state} dispatch={dispatch}/>
      </div>
    </>
  )
}
