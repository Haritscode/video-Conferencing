import {useState,useEffect} from 'react'
import axios from 'axios';
import Input from "@/Components/Inputs/ReducerInput";
import PasswordInput from "@/Components/Inputs/PasswordInput";
import GoogleOauthButton from "@/Components/Buttons/GoogleOauthButton";
import styles from '@/styles/signupForm.module.scss'
interface propsdata{
    state:any,
    setLoading:Function,
    dispatch:Function,
    setFlipSignup:Function
}
export default function SignupForm({state,setLoading,dispatch,setFlipSignup}:propsdata) {
    const [showPassword, setShowPassword]: [boolean, Function] = useState(false);
    const [showVerifyPassword, setShowVerfiyPassword]: [boolean, Function] = useState(false);
    const [showConfirmPasswordError, setshowConfirmPasswordError]: [boolean,Function] = useState(false);
    useEffect(() => {
        if (state?.verifyPassword?.length > 0) {
          if (state.password !== state.verifyPassword) {
            setshowConfirmPasswordError(true);
          } else {
            setshowConfirmPasswordError(false);
          }
        }
      }, [state.password, state.verifyPassword]);
      const createAccount = (e: any) => {
        e.preventDefault();
        setLoading(true);
        if (
          state?.name?.length > 0 &&
          state?.email?.length > 8 &&
          state?.password?.length > 0 &&
          state?.verifyPassword?.length > 0 &&
          !showConfirmPasswordError
        ) {
          axios
            .post("http://localhost:4000/auth/signup", {
              email:state.email,
              password:state.password,
              name:state.name
            },{withCredentials:true})
            .then((result) => {              
              if (result.status === 201) {
                setFlipSignup(true);
                setLoading(false);
              } 
              else if (result.status===208 && result.data.msg==="user already exist") {
                  setLoading(false);
                  console.log("user already exists");
                  
              }
            })
            .catch((err) => {
              console.log(err);
              setLoading(false);
            });
        }
      };
    
      const googleOauth = () => {
        window.location.href = "http://localhost:4000/auth/google/callback";
      };
    return (
    <>
    <div className={styles.signup_content}>
                <span className={styles.singup_heading}>
                  <h1 className={styles.h1}>Let's Get Started From Here!</h1>
                  <p className={styles.signup_thumbnail}>
                    Getting started is easy
                  </p>
                </span>
                <div className={styles.signup_using_google}>
                  <GoogleOauthButton googleOauth={googleOauth} text={"Sign Up With Google"} />
                </div>
                <div className={styles.signup_with_email}>
                  <hr className={styles.hr} />
                  <p className={styles.option_text}>Or Continue with</p>
                  <hr className={styles.hr} />
                </div>
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className={styles.signup_form}
                >
                  <Input
                    type="text"
                    placeholder="Full Name"
                    value={state.name}
                    setValue={dispatch}
                  />
                  <Input
                    type="email"
                    placeholder="Email"
                    value={state.email}
                    setValue={dispatch}
                  />
                  <PasswordInput
                    type={!showPassword ? "password" : "text"}
                    setShowPassword={setShowPassword}
                    showPassword={showPassword}
                    placeholder="Password"
                    value={state.password}
                    setValue={dispatch}
                  />
                  <div className={styles.confirmPassword}>
                    <PasswordInput
                      type={!showVerifyPassword ? "password" : "text"}
                      setShowPassword={setShowVerfiyPassword}
                      showPassword={showVerifyPassword}
                      placeholder="Confirm Password"
                      value={state.verifyPassword}
                      setValue={dispatch}
                    />
                    <p
                      style={
                        showConfirmPasswordError
                          ? { display: "block" }
                          : { display: "none" }
                      }
                      className={styles.error_msg}
                    >
                      Confirm Password and Password must be same
                    </p>
                  </div>
                  <div className={styles.create_account}>
                    <button
                      onClick={createAccount}
                      className={styles.create_account_btn}
                    >
                      Create Account
                    </button>
                  </div>
                </form>
              </div>
    </>
  )
}
