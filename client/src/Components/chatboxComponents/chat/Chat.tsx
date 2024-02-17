import { useState,useReducer,useEffect } from "react";
import styles from "./chat.module.scss";
import Image from "next/image";
import test from "@/assets/male-models-testing.webp";
import {SlOptions} from 'react-icons/sl';
import {BsCameraVideo,BsTelephone,BsFillMicFill,BsEmojiSmile} from 'react-icons/bs';
import {AiOutlinePaperClip} from 'react-icons/ai'
import {HiLocationMarker} from 'react-icons/hi'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react';
import MessageBox from './MessageBox';
import {MessageReducer} from "@/reducer/Message.reducer";
import socket from "@/config/socket.io";
import axios from "axios";
import { useSelector } from "react-redux";
export default function Chat({email,name}:{email:String,name:String}) {  
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isOnline, setIsOnline] = useState<boolean>(false);
  const [showemoji,setShowemoji]=useState<boolean>(false);
  const receiverInfo=useSelector((state:any)=>state.chats.activeChat);
  const [message,setMesssage]=useState<string>("");
  const [state,dispatch]:[any,Function]=useReducer<any>(MessageReducer,[]);
  const getChatData=async()=>{
    // to fetch some previous chats b/w users.
    const messages=await axios.get(`http://localhost:4000/chats/chatdata/?of=${receiverInfo.email}`,{withCredentials:true})
    dispatch({type:"MESSAGES",payload:messages.data});    
  }
  const onButtonDownEvent=(e:any)=>{
    // to emit an socker event when message is send by user
    if(e.key==="Enter"){
      socket.emit("newMessage",email,receiverInfo.email,message,(response:any)=>{
        if(response.status===200){
          dispatch({type:"NEW MESSAGE",payload:{sender:email,msg:message,at:Date.now(),name }})
          setMesssage("");
        }
      })
    }
    }
    const receiveMessage=(sender:String,name:string,profileUrl:String,msg:String,at:number,callback:Function)=>{
      callback({status:200,msg:"okk"});
      dispatch({type:"NEW MESSAGE",payload:{sender,msg,at,name}});
    };
    const friendStatus=async()=>{
      // to get friend online status
      const data=await axios.get(`http://localhost:4000/chats/status?friend=${receiverInfo.email}`,{withCredentials:true})
      if(data.data.status){
        setIsOnline(true);
      }
      else{
        setIsOnline(false);
      }
    }    
    
    useEffect(()=>{
      socket.on("chatStatus",(status)=>{
        console.log("status-->", status);
        setIsOnline(status);
      })
      // for new messages update or to fetch chats data
      socket.on("ReceivedMessage",receiveMessage);
      return ()=>{
        socket.off("ReceivedMessage",receiveMessage);
      }
      },[])
    useEffect(()=>{
      friendStatus()
      getChatData();
    },[receiverInfo])
  return (
    <>
      <div className={styles.chat}>
        <div className={styles.top}>
          <div className={styles.left}>
            <Image src={test} alt="none" className={styles.userImg} />
            <div className={styles.chatDescription}>
              <h2 className={styles.chatting_to}>{receiverInfo.name}</h2>
              <div className={styles.popup_updater}>
                <span>
                  {
                    isOnline?
                    isTyping?
                    <p style={{color:'green'}}>typing...</p>:<p style={{color:'green'}}>Online</p>:
                    <></>
                  }
                </span>
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <button className={styles.camera_button}>
              <BsCameraVideo className={styles.camera_icon} color="gray"/>
            </button>
            <button className={styles.telephone}>
              <BsTelephone className={styles.telephone_icon} color="gray"/>
            </button>
            <button className={styles.more_options}>
              <SlOptions className={styles.menu_icon} color="gray"/>
            </button>
          </div>
        </div>
        <div className={styles.chat_section}>
        {
          state.map((item:any,count:number)=><MessageBox key={count} msg={item?.msg || []} sender={item?.sendBy} at={item?.createdAt} name={item?.name}/>)
        }
        </div>
        <div className={styles.chat_messanger}>
          <div className={styles.input_wrapper}>
            <button className={styles.mics}>
              <BsFillMicFill className={styles.mic_icon}/>
            </button>
            <input type="text" className={styles.input_msg} placeholder="Type your message" onKeyDown={onButtonDownEvent} value={message} onChange={(e:any)=>setMesssage(e.target.value)} />
            <ol className={styles.list}>
              <li className={styles.image}>
                <AiOutlinePaperClip className={styles.image_icon}/>
              </li>
              <li className={styles.picker}>
                <div className={styles.emoji_picker} style={showemoji?{}:{height:"0"}}>
                  <Picker data={data} onEmojiSelect={(e:any)=>setMesssage(message+" "+e.native)} />
                </div>
                <button onClick={()=>setShowemoji(!showemoji)} className={styles.picker_button}>
                  <BsEmojiSmile className={styles.picker_icon}/>
                </button>
              </li>
              <li className={styles.location}>
                <HiLocationMarker className={styles.location_icon}/>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </>
  );
}