import React from 'react'
import styles from '@/styles/popupItems.module.scss'
interface datatypes{
    icon:any,
    text:string,
    setCreateMeetingtype:Function
}
export default function PopupItem({icon,text,setCreateMeetingtype}:datatypes) {
  return (
    <li className={styles.popUpItem} onClick={()=>setCreateMeetingtype(text)}>
        {icon} {text}
    </li>
  )
}
