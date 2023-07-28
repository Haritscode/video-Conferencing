import React from 'react'
import styles from '../../styles/Button.module.scss'
interface data{
    type:string,
    backgroundColor:string,
    border:string,
    borderRadius:string,
    padding:string,
    color:string,
    width:string,
    height:string,
    icon:any,
    boxShadow:string,
    fontSize:string,
    fontWeight:string,
    buttonClick:Function
}
export default function NavbarButtons({type="",backgroundColor="",border="",borderRadius="",padding="",color="",width="",icon="",boxShadow="",fontSize="",fontWeight="",height,buttonClick}:data) {
  return (
    <button className={styles.navbar_button} onClick={(e)=>buttonClick(e)} style={{height,backgroundColor,border,borderRadius,padding,color,boxShadow,fontSize,fontWeight,width}}>{icon} {type}</button>
  )
}
