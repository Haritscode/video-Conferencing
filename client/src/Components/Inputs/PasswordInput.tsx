import React from 'react'
import styles from '../../styles/Input.module.scss'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
interface datatypes{
    type:string
    placeholder:string,
    setShowPassword:Function,
    showPassword:Boolean,
    value:string,
    setValue:Function
}
export default function PasswordInput({type,placeholder,setShowPassword,showPassword,value,setValue}:datatypes) {
  return (
    <>
      <div className={styles.Input_body}>
        <input type={type} placeholder={placeholder} className={styles.Input} value={value} onChange={(e)=>setValue({type:placeholder.toUpperCase(),payload:e.target.value})} />
          <button className={styles.showIcons} style={type==="password"||type==="text"?{}:{display:"none"}} onClick={()=>setShowPassword(!showPassword)}>
           {showPassword?<VisibilityIcon/>:<VisibilityOffIcon/>}
          </button>
    </div>
    </>
  )
}
