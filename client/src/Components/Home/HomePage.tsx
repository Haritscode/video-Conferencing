import {useState,useEffect,useRef} from 'react';
import styles from '@/styles/HomePage.module.scss';
import star from '@/assets/star.svg';
import Image from 'next/image';
import CallTemplate from '../../assets/Video Calling Full Page template from home page.svg'
import Button from '../Buttons/Button';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import InputUsingState from '../Inputs/InputUsingState';
import CreateMeetingPopup from '../Popups/CreateMeetingPopup'
const buttons=[
    {
        text:"New Meeting",
        backgroundColor:'black',
        border:"1px solid black",
        padding:"6px 1rem",
        color:"white",
        borderRadius:"6px",
        icon:<VideocamOutlinedIcon/>,
        boxShadow:"grey 6px 6px 12px",
        width:"fit-content",
        fontWeight:"",
        fontSize:""
    }
]
const HomePage = () => {
    const [urlLink,setUrlLink]=useState("")
    const [isshowPopUp,setIsShowPopUp]=useState(false);
    const buttonClick=()=>{
        setIsShowPopUp(true);
    }
    return (
        <>
        <div className={styles.HomePage}>
            <div className={styles.HomePage_left}>
                <div className={styles.thumbnail}>
                    <h1 className={styles.thumbnail_body}>
                        Fast, reliable and <span className={styles.color_changer}>secure 
                        <Image src={star} alt="none" className={styles.image}/>
                        </span> conferencing
                    </h1>
                </div>
                <p className={styles.thumbnail_text}>
                    Hold incredible events, share knowledge, build and grow your community, create opportunity
                </p>
                <div className={styles.createMeetings}>
                    {buttons.map(item=><Button buttonClick={buttonClick} type={item.text}backgroundColor={item.backgroundColor} border={item.border} padding={item.padding} color={item.color} borderRadius={item.borderRadius} icon={item.icon} boxShadow={item.boxShadow} width={item.width} fontSize={item.fontSize} fontWeight={item.fontWeight}/>)}
                    <div style={isshowPopUp?{}:{display:"none"}} className={styles.newmeetingpopup}>
                        <CreateMeetingPopup/>
                    </div>
                    <InputUsingState type="text" placeholder='Enter a code or link' value={urlLink} setValue={setUrlLink} width="fit-content" padding={"0.5rem 0.8rem"}/>
                    <Button buttonClick={()=>{}} type="Join" backgroundColor="transparent" border="0" padding="0" color={urlLink.length>0?"#0038FF":"#9FB1F1"} borderRadius="none" icon="" boxShadow="none" width="fit-content" fontSize='large' fontWeight='100' />
                </div>
            </div>
            <div className={styles.HomePage_right}>
                <Image src={CallTemplate} alt="none" className={styles.template_image}/>
            </div>
        </div>
        </>
    );
}

export default HomePage;
