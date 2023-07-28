import React from 'react'
import Image from 'next/image';
import styles from '@/styles/GoogleOauthButton.module.scss';
import GoogleIcon from '@/assets/Google Icons.png';
interface data{
    googleOauth:Function,
    text:String
}
export default function GoogleOauthButton({googleOauth,text}:data) {
  return (
    <>
        <button onClick={(e)=>googleOauth()} className={styles.googleOauth}>
            <Image src={GoogleIcon} alt="none" className={styles.google_icon}/>
            <p className={styles.signup_with_google}>{text}</p>
        </button>
    </>
  )
}
