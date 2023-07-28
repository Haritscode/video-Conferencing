import React from 'react'
import styles from '@/styles/featuresOverview.module.scss'
import freemember from '@/assets/freemembership.svg'
import video_chats_icon from '@/assets/video-Chats.svg'
import easyConnection_icon from '@/assets/easyConnection.svg'
import secureConnection_icon from '@/assets/secureConnecton.svg'
import FeatureBox from './featurebox/FeatureBox'
const featureList=[
  {
    icon:freemember,
    title:"Free membership",
    description:"Free for individuals, Conferencing, group Meeting, sharing files.",
    backgroundColor:"#46C9C1",
    imageWidth:"",
  },
  {
    icon:video_chats_icon,
    title:"Video chats",
    description:"Start a free videocall/chatting with high quaity services and with low latency.",
    backgroundColor:"#FEDE70",
    imageWidth:"",
  },
  {
    icon:easyConnection_icon,
    title:"Easy connection",
    description:"Connected with your closer one, Friends, Family or office staff in just two clicks.",
    backgroundColor:"#F480D5",
    imageWidth:"",
  },
  {
    icon:secureConnection_icon,
    title:"Secure Connection",
    description:"Don’t worry about data security. Your data is fully encrypted end-to-end.",
    backgroundColor:"#B4A6FF",
    imageWidth:"",
  }
]
export default function Features() {
  return (
    <>
    <div className={styles.FeaturesBody}>
      <div className={styles.head}>
        <h1 className={styles.heading}>
          Simple & Effective Features That you will get
        </h1>
        <p className={styles.description}>
          Best virtual platform for professional and get-to-gether from remote areas. Now chat, Video Call, Schedule it for later, and well do the rest
        </p>
      </div>
      <ol className={styles.main}>
          {
            featureList.map((item,count)=><li key={count} className={styles.main_list}><FeatureBox imgWidth={item.imageWidth} backgroundColor={item.backgroundColor} icon={item.icon} title={item.title} description={item.description} /></li>)
          }
      </ol>
    </div>
    </>
  )
}
