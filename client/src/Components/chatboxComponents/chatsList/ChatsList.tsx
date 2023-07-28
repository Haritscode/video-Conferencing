import {useState,useReducer, useEffect} from 'react'
import styles from './chatsList.module.scss'
import Searchbar from '../Searchbar/Searchbar'
import {HiLocationMarker} from 'react-icons/hi';
import MessageInfo from '../MessageInfo/MessageInfo';
import {MdMessage} from 'react-icons/md'
import {MessagesReducer as reducer,initialState} from "@/reducer/Message.reducer";
import {FaUserPlus} from 'react-icons/fa'
import NewChat from '../popups/NewChat';

export default function ChatsList() {
  const [search,setSearch]=useState<String>("");
  const [state, dispatch] = useReducer(reducer, initialState);
  const [showPopup,setShowPopUp]=useState<boolean>(false)
  const buttonPressed=(e:any)=>{
    if(e.key==="Enter")
    {
      console.log(search);        
    }
  }
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
          <Searchbar search={search} setSearch={setSearch} buttonPressed={buttonPressed} />
          <li className={styles.pinned_Messages}>
            <h4 className={styles.head}>
              <HiLocationMarker/>
              <p>Pinned Message</p>
            </h4>
            <ol className={styles.pinned_item_list}>
              <MessageInfo isTyping={state.isTyping} countUnseenMessages={state.countUnseenMessages} isMessageReceived= {state.isMessageReceived} isMessageSeen= {state.isMessageSeen}/>
              <MessageInfo isTyping={state.isTyping} countUnseenMessages={state.countUnseenMessages} isMessageReceived= {state.isMessageReceived} isMessageSeen= {state.isMessageSeen}/>
              <MessageInfo isTyping={state.isTyping} countUnseenMessages={state.countUnseenMessages} isMessageReceived= {state.isMessageReceived} isMessageSeen= {state.isMessageSeen}/>
            </ol>
          </li>
        </ol>
      </li>
      <li className={styles.item3}>
        <ol className={styles.Messages}>
          <li className={styles.pinned_Messages}>
            <h4 className={styles.head}>
              <MdMessage/>
              <p>All Messages</p>
            </h4>
            <ol className={styles.pinned_item_list}>
                <MessageInfo isTyping={state.isTyping} countUnseenMessages={state.countUnseenMessages} isMessageReceived= {state.isMessageReceived} isMessageSeen= {state.isMessageSeen}/>
            </ol>
          </li>
        </ol>
      </li>
      </ol>
    </ol>
    </>
  )
}
