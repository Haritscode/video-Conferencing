import React from 'react'
import styles from '@/styles/popupItems.module.scss'
interface datatypes{
    icon:any,
    text:string
}
export default function PopupItem({icon,text}:datatypes) {
  return (
    <li className={styles.popUpItem}>
        {icon} {text}
    </li>
  )
}
