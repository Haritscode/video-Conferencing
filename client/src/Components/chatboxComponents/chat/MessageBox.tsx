import React from 'react'
import styles from './messagebox.module.scss'
import Image from 'next/image'
import dummyImage from '@/assets/male-models-testing.webp'
import { useSelector } from 'react-redux'
interface propsType{
  msg:any,
  sender:String,
  name:String,
  at:Date,
}
export default function MessageBox({msg,sender,name,at}:propsType) {
  const userInfo=useSelector((state:any)=>state.userProfile);  
  return (
    <>
    <div className={styles.messagebox} style={userInfo.email===sender?{left:"2rem"}:{right:"2rem",flexDirection:"row-reverse"}}>
        <Image src={dummyImage} alt="none" className={styles.userProfileImage}/>
        <div className={styles.details} style={userInfo.email===sender?{alignItems: "start"}:{alignItems:"end"}}>
            <p className={styles.senderName}>{name}</p>
            <div className={styles.message_section}>
                {
                  <p className={styles.message_text} style={userInfo.email===sender?{borderTopLeftRadius:"0",borderBottomLeftRadius:'12px'}:{borderTopRightRadius:'0',borderBottomRightRadius:'12px'}}>{msg}</p>
                }
            </div>
        </div>
    </div>
    </>
  )
}
