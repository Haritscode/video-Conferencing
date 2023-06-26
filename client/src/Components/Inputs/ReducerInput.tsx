import React from 'react'
import styles from '../../styles/Input.module.scss'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
interface datatypes{
    type:string
    placeholder:string,
    value:string,
    setValue:Function
}
export default function Input({type,placeholder,value,setValue}:datatypes) {
  return (
    <>
      <div className={styles.Input_body}>
        <input type={type} placeholder={placeholder} className={styles.Input} value={value} onChange={(e)=>setValue({type:placeholder.toUpperCase(),payload:e.target.value})}/>
    </div>
    </>
  )
}
