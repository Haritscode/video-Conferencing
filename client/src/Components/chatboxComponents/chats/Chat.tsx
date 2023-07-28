import { useState } from "react";
import styles from "./chat.module.scss";
import Image from "next/image";
import test from "@/assets/male-models-testing.webp";
import {SlOptions} from 'react-icons/sl';
import {BsCameraVideo,BsTelephone,BsFillMicFill,BsEmojiSmile} from 'react-icons/bs';
import {AiOutlinePaperClip} from 'react-icons/ai'
import {HiLocationMarker} from 'react-icons/hi'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
interface propsType{
  setValue:Function,
  value:string,
  onButtonDownEvent:Function
}
export default function Chat({setValue,value,onButtonDownEvent}:propsType) {
  const [isTyping, setIsTyping] = useState<boolean>(true);
  const [isOnline, setIsOnline] = useState<boolean>(false);
  const [showemoji,setShowemoji]=useState<boolean>(false);
  return (
    <>
      <div className={styles.chat}>
        <div className={styles.top}>
          <div className={styles.left}>
            <Image src={test} alt="none" className={styles.userImg} />
            <div className={styles.chatDescription}>
              <h2 className={styles.chatting_to}>{"Harit Sharma"}</h2>
              <div className={styles.popup_updater}>
                <p
                  className={styles.user_typing}
                  style={isOnline ? { top: "0" } : {}}
                >
                  {!isTyping ? "Online" : "Harit is Typing ..."}
                </p>
                <p
                  className={styles.last_seen}
                  style={!isOnline ? { top: "0" } : {}}
                >
                  Last seen 24 min ago
                </p>
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
        </div>
        <div className={styles.chat_messanger}>
          <div className={styles.input_wrapper}>
            <button className={styles.mics}>
              <BsFillMicFill className={styles.mic_icon}/>
            </button>
            <input type="text" className={styles.input_msg} placeholder="Type your message" onKeyDown={onButtonDownEvent} value={value} onChange={(e:any)=>setValue(e.target.value)} />
            <ol className={styles.list}>
              <li className={styles.image}>
                <AiOutlinePaperClip className={styles.image_icon}/>
              </li>
              <li className={styles.picker}>
                <div className={styles.emoji_picker} style={showemoji?{}:{height:"0"}}>
                  <Picker data={data} onEmojiSelect={(e:any)=>console.log(e)} />
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