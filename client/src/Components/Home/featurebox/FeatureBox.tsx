import React from 'react'
import Image from 'next/image'
import styles from '@/styles/FeatureBox.module.scss'
interface propsType{
  backgroundColor:string,
  icon:any,
  imgWidth:string,
  description:string,
  title:string
}
export default function FeatureBox({backgroundColor,imgWidth,icon,description,title}:propsType) {
  return (
    <>
    <div className={styles.featureItem} style={{backgroundColor}}>
      <Image src={icon} alt="none" style={{width:imgWidth}}/>
      <div className={styles.featureBox}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
    </>
  )
}
