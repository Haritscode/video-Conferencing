import {useState, useEffect} from 'react'
import styles from '@/styles/otpForm.module.scss'
import Image from 'next/image';
import topImage from '@/assets//topImage.png';
import OtpInput from 'react-otp-input';
import otpInputStyles from '@/Components/CustomData/OtpInput';
import Loading from '../Loading/Loading';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { isShowLogInPopUp } from '@/redux/slices/showLogInPopUp';
import { setUserInfo } from '@/redux/slices/userInfo';
import { useRouter } from 'next/router';
interface dataprops{
    email:string,
    password:string,
    name:string
}
interface prosDatatypes{
    data:any,
    popUpLogin:boolean,
    settogglepopup:Function,
}
export default function VerifyEmail({data,popUpLogin,settogglepopup}:prosDatatypes) {
    const [otp, setOtp] = useState<string>('');
    const route=useRouter();
    const dispatch=useDispatch();
    const [windowWidth,setWindowWidth]:[any,Function]=useState<number>();
    const [showLaoding,setShowLoading]:[boolean,Function]=useState(false);
    const setshowLoginPopUp=useDispatch();
    const WindowResize=(e:any)=>{        
        setWindowWidth(e.target.innerWidth)
    }
    const cancleBtn=()=>{
        setOtp('');
        settogglepopup(false);
    }
    const verifyOtp=async()=>{
        setShowLoading(true);
        axios.post("http://localhost:4000/auth/verifyuser",{
            ...data,code:otp},{withCredentials:true}).then(result=>{
                if(result.status===200 || result.status===201)
                {                    
                    dispatch(setUserInfo(result.data))
                    setShowLoading(false);
                    setOtp('');
                    settogglepopup(false);
                    setshowLoginPopUp(isShowLogInPopUp(false));
                    route.push("/");
                }
            }).catch(err=>{
                if(err)
                {
                    setShowLoading(false);
                    setOtp('');
                    settogglepopup(false);
                }
            });
            
        }
    useEffect(()=>{
        setWindowWidth(window.innerWidth);
        window.addEventListener("resize",WindowResize)
        return ()=>window.removeEventListener("resize",WindowResize);
    },[])
    useEffect(()=>{
        if(!popUpLogin)
        {
            setOtp('');
            settogglepopup(false);
            setShowLoading(false);
        }
    },[popUpLogin])
  return (
    <>
    <div className={styles.otpVerify}>
        {   
            showLaoding?<Loading/>:<></>
        }
        <div className={styles.head}>
            <Image src={topImage} alt="none" className={styles.topImage}/>
            <div className={styles.desc}>
                <h1 className={styles.greetings}>Enter Verification Code</h1>
                <p className={styles.fill_request}>We've send a code to <b style={{fontWeight:"500"}}>{data.email}</b></p>
            </div>
        </div>
        <div className={styles.main}>
            <OtpInput
                value={otp}
                onChange={setOtp}
                inputType='number'
                numInputs={6}
                renderSeparator={<span>-</span>}
                inputStyle={windowWidth<450?otpInputStyles['450px']:windowWidth<650?otpInputStyles['650px']:windowWidth<750?otpInputStyles['750px']
                :windowWidth<1200?otpInputStyles['1200px']:
                otpInputStyles['1400px']}
                containerStyle={{display:"flex", gap:'0.3rem',width:"fit-content", alignItems:"center"}}
                renderInput={(props) => <input {...props} />}
            />
            <p className={styles.code}>Didn't get a code? <button className={styles.resend_code_btn}>Click to resend.</button></p>
        </div>
        <hr style={{width:'100%'}}/>
        <div className={styles.footer}>
            <button className={styles.cancle_btn} onClick={cancleBtn}>Cancel</button>
            <button className={styles.verify_btn} onClick={verifyOtp}>Verify</button>
        </div>
    </div>
    </>
  )
}
