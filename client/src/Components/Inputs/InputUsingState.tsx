import React from 'react';
interface datatype{
    type:string,
    placeholder:string,
    value:string,
    setValue:Function,
    width:string,
    padding:string,
}
import styles from '@/styles/Input.module.scss'
const InputUsingState=({type, placeholder, value, setValue}:datatype)=>{
    return(
    <>
    <div className={styles.Input_body}>
        <input className={styles.Input} type={type} placeholder={placeholder} value={value} onChange={(e)=>setValue(e.target.value)} />
    </div>
    </>
    )
}
export default InputUsingState;