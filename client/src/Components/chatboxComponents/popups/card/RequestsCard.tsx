import React from 'react'
import styles from './RequestsCard.module.scss';
import Image from 'next/image';
import image from '@/assets/male-models-testing.webp';
import socket from '@/config/socket.io';
import { useSelector } from 'react-redux';
import RequestButton from '../../buttons/newrequests/RequestButton';
interface propsData{
  email:String,
  name:String,
  profileUrl:String,
  buttonType:String,
  type:String,
  dispatch:Function,
  state:any
}
export default function SendRequestCard({email,name,profileUrl,buttonType,type,dispatch,state}:propsData) {
  const userInfo=useSelector((state:any)=>state.userProfile)
  const acceptButton=()=>{
    socket.emit("accept",email,(response:any)=>{
      console.log(response);
    })
  }
  const sendRequestButton=()=>{
    socket.emit("sendRequest",userInfo.email,email,(response:any)=>{
      if(response.status==201){
        console.log(response.msg);
        dispatch({type:"INVITEDUSERINFO",payload:{...state.invitedUserInfo,type:response.msg}})
      }
    })
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
          buttonType==="new search"?
          <RequestButton text={"Connect"} backgroundColor={"black"} color="white" onClick={sendRequestButton}/>:
          buttonType=="request already sended"?
          <RequestButton text={"requested"} backgroundColor={"white"} color="black" onClick={sendRequestButton}/>:
          <><RequestButton text={"Accept"} backgroundColor={"black"} color="white" onClick={()=>{}}/>
          <RequestButton text={"Decline"} backgroundColor={"white"} color="black" onClick={()=>{}}/></>}
      </div>
    </li>
    </>
  )
}
