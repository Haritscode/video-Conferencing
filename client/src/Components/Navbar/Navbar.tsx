import {useEffect,useState} from "react";
import logo from "../../assets/logo.jpeg";
import Image from "next/image";
import styles from "../../styles/Navbar.module.scss";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { isShowLogInPopUp } from "@/redux/slices/showLogInPopUp";
import Button from '../Buttons/Button'
import { setUserInfo } from "@/redux/slices/userInfo";
interface stateProps{
  userProfile:{
    email:String,
    name:String,
    profileUrl:String
  }
}
export default function Navbar() {
  const dispatch=useDispatch();
  const userData=useSelector((state:stateProps)=>state.userProfile)
  const getdata=async()=>{
    try{
      let res=await axios.get("http://localhost:4000/auth/check-logged-in",{withCredentials:true});
      dispatch(setUserInfo(res.data))
    }
    catch(err:any){      
      console.log(err);
      
      if(err.response?.status===401)
      {
        setTimeout(()=>{
          dispatch(isShowLogInPopUp(true));
        },30000)
      }
      
    }
    
  }  
  useEffect(()=>{    
    getdata()
  },[])  
  return (
    <ul className={styles.Navbar}>
      <Link className={styles.nav_link} href="/">
        <li>
          <Image src={logo} alt="none" className={styles.navbar_icons} />
        </li>
      </Link>
      <li className={styles.routes}>
        <ol className={styles.list}>
          <li className={styles.item}>Products</li>
          <li className={styles.item}>Solutions</li>
          <li className={styles.item}>Pricing</li>
          <li className={styles.item}>Resources</li>
        </ol>
      </li>
      <li className={styles.Navbar_Right}>
        {!userData?.email?<ol className={styles.signup_login_list}>
          <li>
            <Button
              buttonClick={() => {dispatch(isShowLogInPopUp(true))}}
              type="Log in"
              backgroundColor="white"
              border="1px solid black"
              padding="12px 2rem"
              color="black"
              borderRadius="6px"
              width="7rem"
              boxShadow="gray 3px 3px 6px"
              icon=""
              fontSize=""
              fontWeight=""
              height=""
            />
          </li>
          <Link className={styles.nav_link} href="/signup">
            <li>
              <Button
                buttonClick={() => {}}
                type="Sign up"
                backgroundColor="black"
                border="1px solid black"
                padding="12px 2rem"
                color="white"
                borderRadius="6px"
                boxShadow="gray 3px 3px 6px"
                width="fit-content"
                icon=""
                fontSize=""
                fontWeight=""
                height=""
              />
            </li>
          </Link>
        </ol>:
        <ol className={styles.userInfo_list}>
          <li className={styles.email_box}>
            <p className={styles.email}>{userData.email}</p>
          </li>
          {userData?.profileUrl?.length>0?
            <li className={styles.userImage}>
              <Image src={userData.profileUrl.length>0?userData.profileUrl:""} alt="none" className={styles.image} width={20} height={20}/>
            </li>:
            <li className={styles.DefaultLogo}>
              {
                userData.name?.split(" ")[0].charAt(0).toUpperCase()+userData.name?.split(" ")[userData.name?.split(" ").length-1][0].toUpperCase()
              }
            </li>
          }
        </ol>}
      </li>
    </ul>
  );
}