import {useState,useReducer, useEffect} from 'react'
import styles from './chatsList.module.scss'
import Searchbar from '../Searchbar/Searchbar'
import {HiLocationMarker} from 'react-icons/hi';
import {MdMessage} from 'react-icons/md'
import {MessageReducer ,initialState} from "@/reducer/Message.reducer";
import {FaUserPlus} from 'react-icons/fa'
import NewChat from '../popups/NewChat';
import Sections from './ChatSections';
import axios from 'axios';
import { useSelector } from 'react-redux';
export default function UserChatSearch() {
  const [search,setSearch]=useState<String>("");
  const [state, dispatch] = useReducer(MessageReducer, initialState);
  const [showPopup,setShowPopUp]=useState<boolean>(false);
  const userInfo=useSelector((state:any)=>state.userProfile);
  const searchChat=async()=>{
    try{
      let result=await axios.post("http://localhost:4000/chats/findChat",{searchByEmail:search},{withCredentials:true});
      console.log(result.data);
    }
    catch(err){
      console.log(err);
      
    }
  }  
  useEffect(()=>{
    if(search.length>0){
      searchChat();
    }
  },[search])
  return (
    <>
    <ol className={styles.chat}>
      <li className={styles.item1}>
        <h1 className={styles.section_name}>Messages</h1>
        <div className={styles.requests_newChat}>
          <button className={styles.right_side} onClick={()=>setShowPopUp(!showPopup)}>
            <FaUserPlus className={styles.addUser_icons}/>
          </button>
          <NewChat showPopup={showPopup} setShowPopup={setShowPopUp}/>
        </div>
      </li>
      <ol className={styles.items}>
      <li className={styles.item2}>
        <ol className={styles.Messages}>
          <Searchbar search={search} setSearch={setSearch} />
          <Sections icon={<HiLocationMarker/>} type={"Pinned Message"} state={state} userInfo={userInfo} />
          <Sections icon={<MdMessage/>} type={"All Message"} state={state} userInfo={userInfo}/>
        </ol>
      </li>
      </ol>
    </ol>
    </>
  )
}
