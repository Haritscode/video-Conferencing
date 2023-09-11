import React, { useRef, useState, useEffect } from 'react'
import styles from './searchbar.module.scss'
import {RxCross2} from 'react-icons/rx';
interface propTypes{
    search:any,
    setSearch:Function,
}
export default function Searchbar({search,setSearch}:propTypes) {
    const [showclearSearchButton,setShowClearSearchButton]=useState<boolean>(false)
    useEffect(()=>{
      if(!showclearSearchButton){
        setSearch('');
      }
    },[showclearSearchButton])
  return (
    <>
    <li className={styles.searchbar}>
            <div className={styles.wrapper}>
                <input type="text" placeholder={"Search User(by email) / Chats Here..."} className={styles.searchbar_input} value={search} onChange={e=>setSearch(e.target.value)} onFocus={()=>setShowClearSearchButton(true)} onBlur={()=>setShowClearSearchButton(false)}/>
                <button className={styles.clear_Search} style={showclearSearchButton?{}:{display:"none"}}>
                    <RxCross2/>
                </button>
        </div>
    </li>
    </>
  )
}
