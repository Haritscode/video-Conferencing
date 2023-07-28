import {useState, useReducer, useEffect} from 'react'
import styles from '@/styles/LoginForm.module.scss';
import Image from 'next/image';
import axios from 'axios';
import topImage from '@/assets//topImage.png'
import GoogleOauthButton from '../Buttons/GoogleOauthButton';
import Input from '../Inputs/ReducerInput';
import PasswordInput from '../Inputs/PasswordInput';
import Checkbox from '../Checkbox/Checkbox';
import Loading from '@/Components/Loading/Loading'
interface validateData{
    email:string,
    password:string
}
interface propsType{
    settogglepopup:Function,
    setData:Function,
    popUpLogin:boolean
}
const initalState:validateData={
    email:"",
    password:""
}
export default function LogInForm({settogglepopup,setData,popUpLogin}:propsType) {
    const [showLoading,setShowLoading]:[boolean,Function]=useState(false)
    const googleOauth=()=>{
        window.location.href="http://localhost:4000/auth/google/callback";
    }
    const [showPassword,setShowPassword]=useState(false);
    const reducer=(state:validateData,action:{type:string,payload:string})=>{
        switch(action.type){
            case "EMAIL":
                return {...state,email:action.payload}
            case "PASSWORD":
                return {...state,password:action.payload};
            case "RESET":
                return initalState;
                default:
            return state;
        }
    }
    const [state,dispatch]=useReducer(reducer,initalState);
    const onSubmit=(e:any)=>{
        setShowLoading(true);
        if(state.email.length>0 && state.password.length>0)
        {
            axios.post("http://localhost:4000/auth/login",state,{withCredentials:true}).then(result=>{       
                if(result.status===201 || result.status===208){                    
                    setData({email:state.email,password:state.password});
                    dispatch({type:"RESET",payload:""});
                    setShowLoading(false);
                    settogglepopup(true);
                }
            })
            .catch(err=>{
                console.log(err);
                
                if(err.response.status===500 || err.response.status===401 || err.response.status===404){
                    setShowLoading(false);
                }
            })
        }
    }
    useEffect(()=>{
        if(!popUpLogin)
        {
            setShowLoading(false);
        }
    },[popUpLogin])
  return (
    <>
    <div className={styles.login_form}>
        {
            showLoading ?<Loading/>:<></>
        }
    <div className={styles.head}>
            <Image src={topImage} alt="none" className={styles.topImage}/>
            <div className={styles.desc}>
                <h1 className={styles.greetings}>Welcome back</h1>
                <p className={styles.fill_request}>Please enter your details to sign in.</p>
            </div>
            <GoogleOauthButton googleOauth={googleOauth} text="Login With Google"/>
        </div>
        <div className={styles.head_main_divider}>
            <hr className={styles.hr}/>
            <p className={styles.text}>or</p>
        </div>
        <div className={styles.login_form_section}>
            <form onSubmit={e=>e.preventDefault()} className={styles.form}>
                <Input type="email" placeholder="Email" value={state.email} setValue={dispatch}/>
                <div className={styles.password}>
                    
                <PasswordInput type={showPassword?'text':'password'} placeholder='password' setShowPassword={setShowPassword}  value={state.password} showPassword={showPassword} setValue={dispatch}/>
                <div className={styles.login_options}>
                    <Checkbox label="Remember me" value={"remember me"}/>
                    <button className={styles.forget_Password}>reset password?</button>
                </div>
                </div>
                <button className={styles.login_button} onClick={onSubmit}>Login</button>
            </form>
        </div>
    </div>
    </>
  )
}
