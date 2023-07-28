import { useState } from "react";
import styles from "./message.module.scss";
import test from "@/assets/male-models-testing.webp";
import Image from "next/image";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
interface propsType {
  isTyping: boolean;
  countUnseenMessages: number;
  isMessageReceived: boolean;
  isMessageSeen: boolean;
}
export default function MessageInfo({isTyping,countUnseenMessages,isMessageReceived,isMessageSeen}:propsType) {
  const [dots, setDots] = useState<String>("...");
  return (
    <>
      <li className={styles.messageBody}>
        <Image src={test} alt="none" className={styles.image} />
        <div className={styles.sender_Details}>
          <span className={styles.sender_info}>
            <p className={styles.sender_name}>Harit Sharma</p>
            <p className={styles.time}>05:45 AM</p>
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
                  here is the last message sent or received
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
