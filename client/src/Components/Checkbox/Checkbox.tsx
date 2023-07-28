import React from 'react'
import styles from '@/styles/checkbox.module.scss';
interface propsType{
    value:string,
    label:string
}
export default function Checkbox({value,label}:propsType) {
  return (
    <>
    <div className={styles.checkbox_main}>
        <input type="checkbox" id={value} name="vehicle1" value={value} className={styles.checkbox}/>
        <label htmlFor={value} className={styles.label}>{label}</label><br/>
    </div>
    </>
  )
}


// used to select and delete multiple selected messages
