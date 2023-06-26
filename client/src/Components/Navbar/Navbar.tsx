import React from 'react'
import logo from '../../assets/logo.jpeg'
import Image from 'next/image';
import styles from '../../styles/Navbar.module.scss'
import Link from 'next/link';
import Button from '../Buttons/Button';
export default function Navbar() {
  return (
    <ul className={styles.Navbar}>
        <li>
            <Image src={logo} alt="none" className={styles.navbar_icons}/>
        </li>
        <li className={styles.routes}>
            <ol className={styles.list}>
                <li className={styles.item}>Products</li>
                <li className={styles.item}>Solutions</li>
                <li className={styles.item}>Pricing</li>
                <li className={styles.item}>Resources</li>
            </ol>
        </li>
        <li className={styles.signup_login}>
            <ol className={styles.signup_login_list}>
                <li>
                    <Button buttonClick={()=>{}} type="Log in" backgroundColor='white' border="1px solid black" padding="12px 2rem" color="black" borderRadius="6px" width='7rem' boxShadow="gray 3px 3px 6px" icon="" fontSize='' fontWeight=''/>
                </li>
                <li>
                    <Button buttonClick={()=>{}} type="Sign up" backgroundColor='black' border="1px solid black" padding="12px 2rem" color="white" borderRadius="6px" boxShadow="gray 3px 3px 6px" width="fit-content" icon="" fontSize='' fontWeight=''/>
                </li>
            </ol>
        </li>
    </ul>
  )
}
