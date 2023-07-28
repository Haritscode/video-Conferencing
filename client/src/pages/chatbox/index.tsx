import {useEffect, useState} from 'react'
import styles from '@/styles/charbox.module.scss'
import LeftSidebar from '@/Components/chatboxComponents/LeftSideBar/LeftSidebar'
import { useSelector,useDispatch } from 'react-redux';
import axios from 'axios';
import socket from '@/config/socket.io'
import { setUserInfo } from '@/redux/slices/userInfo';
import ChatList from '@/Components/chatboxComponents/chatsList/ChatsList';
import Chats from '@/Components/chatboxComponents/chats/Chats';
import {useRouter} from 'next/router';
import { setRequests } from '@/redux/slices/chats';
interface profileTypes{
    email:String,
    name:String,
    profileUrl:String
  }
interface stateProps{
  userProfile:profileTypes
}
export default function chatbox() {
  const userData:profileTypes=useSelector((state:stateProps)=>state.userProfile);
  const requests=useSelector((state:any)=>state.chats.requestList);
  const dispatch=useDispatch();
  const route=useRouter();
  const getUserInfo=async()=>{
    try{
      let res=await axios.get("http://localhost:4000/auth/check-logged-in",{withCredentials:true});
      dispatch(setUserInfo(res.data))
    }
    catch(err:any){
      if(err.response?.status===401){
        route.push("/")
      }
    }
  }

  const socketIo=()=>{
    if(userData.email.length>0 || userData.profileUrl.length>0){
      socket.connect();
      socket.emit("userConnected",userData.email,(response:any)=>{
        if(response.status===200){
          dispatch(setRequests(response.requests))
        }
      });
      socket.on("connect",()=>{
        console.log("server created Successfully");
      })
      socket.on("auth_Error",arg=>{
        console.log(arg);
      });
      return ()=>socket.close();
    }
  }
  useEffect(()=>{
    if(userData.email.length==0 || userData.profileUrl.length==0 || userData.profileUrl.length==0)
    {
      getUserInfo();
    }
  },[]);
  
  useEffect(()=>{
    socketIo();
  },[userData.email])
  useEffect(()=>{
    socket.on("newFriendRequest",(userInfo,callback)=>{
      if(userInfo.email.length>0)
      {
        let data=[...requests,userInfo]
        dispatch(setRequests(data));
      }
    })
  },[requests])
  return (
    <>
    <div className={styles.chatbox}>
      <LeftSidebar userData={userData}/>
      <ChatList/>
      <Chats/>
    </div>
    </>
  )
}
