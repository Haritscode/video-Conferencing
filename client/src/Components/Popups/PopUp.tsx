import React, {  useState,useEffect } from 'react';
import styles from '@/styles/Popup.module.scss'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useDispatch,useSelector } from 'react-redux';
import { isShowLogInPopUp } from '@/redux/slices/showLogInPopUp';

import VerifyEmail from './OtpForm';
import LogInForm from './LogInForm';
interface propsData{
  setPopUpLogin:Function,
  popUpLogin:boolean
}
export default function Login({setPopUpLogin,popUpLogin}:propsData) {
    const setshowLoginPopUp=useDispatch();
    const showPopUp=useSelector((state:any)=>state.showLogInPopUp.show)
    const [togglepopup,settogglepopup]=useState<boolean>(false);
    
    const [data,setData]=useState({email:"",password:""});
    useEffect(()=>{
      setPopUpLogin(showPopUp)
  },[showPopUp])
  // check it and refector it as well
  return (
    <>
    <div className={styles.login_popup}>
        <button className={styles.close_login_popup_btn} onClick={()=>setshowLoginPopUp(isShowLogInPopUp(false))}>
            <CloseOutlinedIcon/>
        </button>
        <div className={styles.popup_container}>
          <div className={styles.flip_card} style={togglepopup?{transform: 'rotateY(180deg)'}:{}}>
            <div className={styles.flip_front}>
              <LogInForm settogglepopup={settogglepopup} setData={setData} popUpLogin={popUpLogin}/>
            </div>
            <div className={styles.flip_back}>
              <VerifyEmail settogglepopup={settogglepopup} data={data} popUpLogin={popUpLogin}/> 
            </div>
          </div>
        </div>
    </div>
    </>
  )
}
