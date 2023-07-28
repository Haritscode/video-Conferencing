import React from 'react'
import styles from './requestbutton.module.scss';
interface propsType{
  text:String,
  backgroundColor:string,
  color:string,
  onClick:any
}
export default function RequestButton({backgroundColor,text,color,onClick}:propsType) {
  return (
    <>
      <button className={styles.button} style={{backgroundColor,color}} onClick={onClick}>
        <p className={styles.button_text}>
          {text}
        </p>
      </button>
    </>
  )
}
