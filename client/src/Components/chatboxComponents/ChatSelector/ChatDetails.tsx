import { useState,useEffect } from "react";
import styles from "./chatDetails.module.scss";
import test from "@/assets/male-models-testing.webp";
import Image from "next/image";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import { useDispatch, useSelector } from "react-redux";
import { setActiveChat } from "@/redux/slices/chats";
interface propsType {
  isTyping: boolean;
  countUnseenMessages: number;
  isMessageReceived: boolean;
  isMessageSeen: boolean,
  chatDetails:any,
  userInfo:any,
}
export default function ChatInfo({isTyping,countUnseenMessages,isMessageReceived,isMessageSeen,chatDetails,userInfo}:propsType) {
  const [dots, setDots] = useState<String>("...");
  const dispatch=useDispatch();
  const chatSelected=useSelector((state:any)=>state.chats.activeChat);
  return (
    <>
      <li className={chatSelected.email===chatDetails.email?styles.messageBody_active:styles.messageBody} onClick={()=>dispatch(setActiveChat({email:chatDetails.email,name:chatDetails.name,profileUrl:chatDetails.profileUrl}))}>
        <Image src={test} alt="none" className={styles.image} />
        <div className={styles.sender_Details}>
          <span className={styles.sender_info}>
            <p className={styles.sender_name}>{chatDetails.name}</p>
            {/* <p className={styles.time}>{lastMessageTiming}</p> */}
          </span>
          <span className={styles.other_properties}>
            {isTyping ? (
              <div className={styles.typing}>
                <p className={styles.text}>typing...</p>
                {countUnseenMessages > 0 ? (
                  <div className={styles.unseenMessage}>
                    <p className={styles.count}>
                        {countUnseenMessages <= 99
                          ? countUnseenMessages
                          : "99+"}
                    </p>
                  </div>
                ) : (
                  ""
                )}
              </div>
            ) : (
              <div className={styles.last_msg_update}>
                <p className={styles.last_message}>
                  {chatDetails.message}
                </p>
                {countUnseenMessages == 0 ? (
                  <div className={styles.ticks}>
                    {!isMessageReceived ? (
                      <span className={styles.msg_not_received_yet}>
                        <DoneOutlinedIcon className={styles.tick_icon} />
                      </span>
                    ) : (
                      <span className={styles.message_received}>
                        <span className={styles.firstTick}>
                          <DoneOutlinedIcon
                            className={styles.tick_icon}
                            style={isMessageSeen ? { color: "blue" } : {}}
                          />
                        </span>
                        <DoneOutlinedIcon
                          className={styles.tick_icon}
                          style={isMessageSeen ? { color: "blue" } : {}}
                        />
                      </span>
                    )}
                  </div>
                ) : (
                  <div className={styles.unseenMessage}>
                    <p className={styles.count}>
                      {countUnseenMessages <= 99
                        ? countUnseenMessages
                        : "99+"}
                    </p>
                  </div>
                )}
              </div>
            )}
            {}
          </span>
        </div>
      </li>
    </>
  );
}
