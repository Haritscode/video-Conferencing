import { useState , useEffect} from "react";
import styles from "./leftsidebar.module.scss";
import charIcon from "@/assets/chats/char icon.svg";
import Image from "next/image";
import { AiOutlineMessage } from "react-icons/ai";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { GoFileDirectory } from "react-icons/go";
import { IoCallOutline } from "react-icons/io5";
import { BiSolidLogOut } from "react-icons/bi";
import {MdOutlineManageAccounts} from 'react-icons/md'
import axios from "axios";
import profile from '@/assets/chats/testImage.jpg'
import { useDispatch } from "react-redux";
import { setlogOutUser } from "@/redux/slices/userInfo";
import { useRouter } from "next/router";
import Link from "next/link";
import MenuList from "./MenuList";
const menuList = [
  {
    name: "Call",
    Icon: <IoCallOutline className={styles.icon}/>,
  },
  {
    name: "Chats",
    Icon: <AiOutlineMessage className={styles.icon}/>,
  },
  {
    name: "Files",
    Icon: <GoFileDirectory className={styles.icon}/>,
  },
  {
    name: "Community",
    Icon: <HiOutlineUserGroup className={styles.icon}/>,
  },
  {
    name: "Setttings",
    Icon: <MdOutlineManageAccounts className={styles.icon}/>,
  },
];
export default function LeftSidebar({userData}:any) {
  const dispatch=useDispatch();
  const router=useRouter()
  const [selected, setSelected]: [string, Function] = useState("");
  const logout=async()=>{
    try{
      let response=await axios.get("http://localhost:4000/auth/logout",{withCredentials:true})
      if(response.status===200){
        dispatch(setlogOutUser())
        router.push("/");
      }
    }
    catch(err:any){
      if(err.response.status===402){
        console.log(err); 
      }
    }
    }
  return (
    <>
      <ol className={styles.left_side_list}>
        <ol className={styles.left_side_top}>
          <li className={styles.item1}>
            <div className={styles.box}>
              <Image src={charIcon} alt="none" className={styles.icon} />
              <h2 className={styles.name}>Chatbox</h2>
            </div>
          </li>
          <li className={styles.item2}>
            <ol className={styles.menu_list}>
              {menuList?.map(({ name, Icon }, count) => <MenuList key={count} setSelected={setSelected} selected={selected} name={name}Icon={Icon}/>)}
            </ol>
          </li>
        </ol>
          <li className={styles.item3}>
            <ol className={styles.menu_list}>
                <Link className={styles.back_button} href="/">
                  <li className={styles.item}>
                    <BiSolidLogOut className={styles.icon} />
                    <p className={styles.name}>Back</p>
                  </li>
                </Link>
              <li className={styles.userProile}>
                <Image src={profile} alt="none" className={styles.userImage}/>
                <div className={styles.info}>
                    <p className={styles.userName}>{userData.name}</p>
                    <button onClick={logout} className={styles.logout}>Logout</button>
                </div>
              </li>
            </ol>
          </li>
      </ol>
    </>
  );
}
