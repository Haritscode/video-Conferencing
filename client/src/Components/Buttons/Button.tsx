import React from 'react'
interface data{
    type:string,
    backgroundColor:string,
    border:string,
    borderRadius:string,
    padding:string,
    color:string,
    width:string,
    icon:any,
    boxShadow:string,
    fontSize:string,
    fontWeight:string,
    buttonClick:Function
}
import styles from '../../styles/Button.module.scss'
import { FunctionBody } from 'typescript'
export default function NavbarButtons({type,backgroundColor,border,borderRadius,padding,color,width,icon,boxShadow,fontSize,fontWeight,buttonClick}:data) {
  return (
    <button className={styles.navbar_button} onClick={buttonClick} style={{backgroundColor,border,borderRadius,padding,color,boxShadow,fontSize,fontWeight}}>{icon} {type}</button>
  )
}
