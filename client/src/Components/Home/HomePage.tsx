import {useState,useEffect,useRef} from 'react';
import styles from '@/styles/HomePage.module.scss';
import star from '@/assets/star.svg';
import Image from 'next/image';
import CallTemplate from '../../assets/Video Calling Full Page template from home page.svg'
import Button from '../Buttons/Button';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import InputUsingState from '../Inputs/InputUrl';
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
    const [Meetingtype,setCreateMeetingtype]=useState('');
    const [buttonWidth,setButtonWidth]=useState(buttons[0].width)
    const [showJoinMeetingBtn,setShowJoinMeetingBtn]=useState(false);
    // Condition for video conferencing application is not upto the mark. Check and find some better solution later.
    
    const [isPopUpClicked,setIsPopUpClicked]=useState(false);
    const handleShowHidePopup=()=>{
        if(isPopUpClicked && isshowPopUp)
        {
            setIsShowPopUp(false);
        }
    }
    useEffect(()=>{
        if(isshowPopUp){
            setIsShowPopUp(false)
        }
    },[Meetingtype])


    const buttonClick=()=>{
        console.log("new meeting btn clicked")
        setIsShowPopUp(true);
    }
    const joinMeetingBtn=()=>{
        console.log("join button clicked")
        setShowJoinMeetingBtn(false);
    }
    let resizeWidth=()=>{
        console.log(window.innerWidth);
        
        if(window.innerWidth<=575)
        {
            setButtonWidth("10%")
        }
        else{
            setButtonWidth(buttons[0].width)
        }    
    }
    useEffect(() => {
        window.addEventListener("resize",resizeWidth)
        return window.removeEventListener("resize",resizeWidth);
    }, [])
    return (
        <>
        <div className={styles.HomePage} onClick={handleShowHidePopup}>
            <div className={styles.HomePage_left}>
                <div className={styles.thumbnail}>
                    <h1 className={styles.thumbnail_body}>
                        Fast, reliable and
                        <div className={styles.innerText}>
                            <span className={styles.color_changer}>secure 
                                <Image src={star} alt="none" className={styles.image}/>
                            </span>
                        </div>
                        conferencing
                    </h1>
                </div>
                <p className={styles.thumbnail_text}>
                    Hold incredible events, share knowledge, build and grow your community, create opportunity
                </p>
                <div className={styles.createMeetings}>
                    {buttons.map((item,count)=><Button key={count} buttonClick={buttonClick} type={item.text}backgroundColor={item.backgroundColor} border={item.border} padding={item.padding} color={item.color} borderRadius={item.borderRadius} icon={item.icon} boxShadow={item.boxShadow} width={buttonWidth} fontSize={item.fontSize} fontWeight={item.fontWeight} height=""/>)}
                    <div style={isshowPopUp?{}:{display:"none"}} className={styles.newmeetingpopup} onClick={()=>setIsPopUpClicked(true)}>
                        <CreateMeetingPopup setCreateMeetingtype={setCreateMeetingtype}/>
                    </div>
                    <div className={styles.meeting_url}>
                        <div className={styles.url_input} style={showJoinMeetingBtn?{width:"70%"}:{width:"90%"}}>
                            <InputUsingState type="text" placeholder='Enter a code or link' value={urlLink} setValue={setUrlLink} width="fit-content" padding={"0.5rem 0.8rem"} setShowJoinMeetingBtn={setShowJoinMeetingBtn}/>
                        </div>
                        <div className={styles.join_btn}>
                            <Button buttonClick={joinMeetingBtn} type="Join" backgroundColor="transparent" border="0" padding="0" color={urlLink.length>0?"#0038FF":"#9FB1F1"} borderRadius="none" icon="" boxShadow="none" width='fit-content' fontSize='large' fontWeight='300' height="" />
                        </div>
                    </div>
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
