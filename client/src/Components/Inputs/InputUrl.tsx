import React from 'react';
interface datatype{
    type:string,
    placeholder:string,
    value:string,
    setValue:Function,
    width:string,
    padding:string,
    setShowJoinMeetingBtn:Function
}
import styles from '@/styles/Input.module.scss'
const InputUsingState=({type, placeholder, value, setValue,width,setShowJoinMeetingBtn}:datatype)=>{
    const onFocusOut=()=>{
        setTimeout(()=>{
            setShowJoinMeetingBtn(false)
        },300)
    }
    return(
    <>
    <div className={styles.Input_body}>
        <input className={styles.Input} type={type} placeholder={placeholder} value={value} onChange={(e)=>setValue(e.target.value)} onFocus={()=>setShowJoinMeetingBtn(true)} onBlur={onFocusOut}/>
    </div>
    </>
    )
}
export default InputUsingState;