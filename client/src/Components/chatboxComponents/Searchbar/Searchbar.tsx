import React, { useRef, useState, useEffect } from 'react'
import styles from './searchbar.module.scss'
import {RxCross2} from 'react-icons/rx';
interface propTypes{
    search:any,
    setSearch:Function,
    buttonPressed:Function
}
export default function Searchbar({search,setSearch,buttonPressed}:propTypes) {
    const [showclearSearchButton,setShowClearSearchButton]=useState<boolean>(false)
    const Search=(e:any)=>{
        if(e.key==="Enter"){
            // console.log(search);
        }
    }
  return (
    <>
    <li className={styles.searchbar}>
            <div className={styles.wrapper}>
                <input type="text" placeholder={"Search User(by email) / Chats Here..."} className={styles.searchbar_input} value={search} onChange={e=>setSearch(e.target.value)} onKeyDown={Search} onFocus={()=>setShowClearSearchButton(true)} onBlur={()=>setShowClearSearchButton(false)}/>
                <button className={styles.clear_Search} style={showclearSearchButton?{}:{display:"none"}} onClick={()=>setSearch("")} onKeyDown={e=>buttonPressed(e)}>
                    <RxCross2/>
                </button>
        </div>
    </li>
    </>
  )
}
