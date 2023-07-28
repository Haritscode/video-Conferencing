import {useState} from 'react'
import styles from './chats.module.scss'
import Chat from './Chat'
export default function Chats() {
  const [value,setValue]=useState<string>("")
  const onButtonDownEvent=(e:any)=>{
    if(e.key==="Enter"){
      console.log(value);
      setValue("");
    }
  }
  return (
    <>
    <div className={styles.chat}>
      <Chat setValue={setValue} value={value} onButtonDownEvent={onButtonDownEvent}/>
    </div>
    </>
  )
}
