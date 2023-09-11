import {useEffect, useState} from 'react'
import styles from './sections.module.scss'
import ChatInfo from '../ChatSelector/ChatDetails';
import axios from 'axios';
interface propsType{
    icon:any,
    type:String,
    state:any,
    userInfo:any
}
export default function ChatSections({icon,type,state,userInfo}:propsType) {
  const [chatList,setChatList]=useState<Array<any>>([]);
  const fetchChats=async()=>{
    let result=await axios.get("http://localhost:4000/chats/chatsList",{withCredentials:true});
    if(result.data){      
      console.log(result);
            
      setChatList(result.data);
    }
  }
  useEffect(()=>{
    if(type==="All Message"){
      fetchChats();
    }
  },[userInfo])
  
  return (
    <>
    <li className={styles.pinned_Messages} style={chatList.length>0?{}:{display:"none"}}>
            <h4 className={styles.head}>
              {icon}
              <p>{type}</p>
            </h4>
            <ol className={styles.pinned_item_list}>
              {chatList.map((chatDetails:any,count)=><ChatInfo key={count} isTyping={state.isTyping} countUnseenMessages={state.countUnseenMessages} isMessageReceived={state.isMessageReceived} isMessageSeen={state.isMessageSeen} chatDetails={chatDetails} userInfo={userInfo}/>)}
            </ol>
          </li>
    </>
  )
}
