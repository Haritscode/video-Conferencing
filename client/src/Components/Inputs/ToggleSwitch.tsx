import React from 'react'
import Switch from '@mui/material/Switch';
import styles from '../../styles/ToggleSwitch.module.scss'

interface data{
  lable:string
}
export default function ToggleSwitch({lable}:data) {
    const label = { inputProps: { 'aria-label': 'Switch demo' } };
  return (
    <>
    <div className={styles.ToggleSwitch}>
      <Switch {...label} style={{width:"fit-content"}} />
      <p className={styles.label}>{lable}</p>
    </div>
    </>
  )
}
