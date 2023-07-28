import {useState} from "react";
import styles from './MenuList.module.scss'
interface PropsData{
    setSelected:Function,
    selected:String,
    name:String,
    Icon:any
}
export default function MenuList({setSelected,selected,name,Icon}:PropsData) {
    const [new_count,setNewCount]=useState(10);
  return (
    <>
      <li
        onClick={() => setSelected(name)}
        className={selected === name ? styles.item_after : styles.item_before}
      >
        <div
          className={selected === name ? styles.left_after : styles.left_before}
        >
          {Icon}
          <p className={styles.name}>{name}</p>
        </div>
        <div className={styles.new_update} style={new_count===0?{display:"none"}:new_count<10?{width:"20px",height:"20px"}:new_count<99?{width:"20px",height:"20px"}:{width:"30px",height:"30px"}}>
          <p className={styles.count}>{new_count<99?new_count:'99+'}</p>
        </div>
      </li>
    </>
  );
}
