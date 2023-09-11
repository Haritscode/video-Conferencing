import React from 'react'
import styles from './RequestsCard.module.scss';
import Image from 'next/image';
import image from '@/assets/male-models-testing.webp';
import socket from '@/config/socket.io';
import { useDispatch, useSelector } from 'react-redux';
import RequestButton from '../../buttons/newrequests/RequestButton';
import { setActiveChat, setRequests } from '@/redux/slices/chats';
interface propsData{
  email:String,
  name:String,
  profileUrl:String,
  buttonType:String,
  dispatch:Function,
  state:any,
  id:number
}
export default function SendRequestCard({email,name,profileUrl,buttonType,dispatch,state,id}:propsData) {
  const userInfo=useSelector((state:any)=>state.userProfile)
  const requests=useSelector((state:any)=>state.chats.requestList);
  const dispatcher=useDispatch(); 
  const requestButton=(value:String)=>{
    socket.emit("acceptRequest",userInfo.email,email,value,(response:{status:number})=>{      
      if(buttonType==="response" && response.status===200){
        let updateRequests=requests.filter((item:any,count:number)=>count!==id);
        dispatcher(setRequests(updateRequests))        
      }
    })
  }
  const sendRequestButton=()=>{    
    socket.emit("sendRequest",userInfo.email,email,(response:any)=>{
      if(response.status==201){
        dispatch({type:"INVITEDUSERINFO",payload:{...state.invitedUserInfo,type:response.msg}})
      }
    })
  };
  socket.on("requestUpdate",(msg)=>{
    dispatch({type:"INVITEDUSERINFO",payload:{...state.invitedUserInfo,type:msg}})
  })
  const startChat=()=>{
    dispatcher(setActiveChat({email}))    
  }  
  return (
    <>
    <li className={styles.list}>
      <div className={styles.body}>
        <Image src={image} alt="none" className={styles.userImage}/>
        <div className={styles.user_description}>
          <p className={styles.email}>{email}</p>
          <p className={styles.name}>{name}</p>
        </div>
      </div>
      <div className={styles.accept_decline_btns}>
        {
          buttonType==="new"?
          <RequestButton text={"Connect"} backgroundColor={"black"} color="white" onClick={sendRequestButton}/>:
          buttonType=="request already sended"?
          <RequestButton text={"requested"} backgroundColor={"white"} color="black" onClick={()=>{}}/>:
          buttonType==="connected"?<RequestButton text={"Chat Now"} backgroundColor={"black"} color="white" onClick={()=>startChat()}/>:<><RequestButton text={"Accept"} backgroundColor={"black"} color="white" onClick={()=>requestButton('accepted')}/>
          <RequestButton text={"Decline"} backgroundColor={"white"} color="black" onClick={()=>requestButton('decline')}/></>}
      </div>
    </li>
    </>
  )
}
