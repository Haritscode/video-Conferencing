import { useState, useReducer, useEffect } from "react";
import styles from "../styles/signup.module.scss";
import signupImage from "../assets/signup_image.avif";
import logo from "../assets/logo.svg";
import Image from "next/image";
import Link from "next/link";

import Loading from "@/Components/Loading/Loading";
import VerifyEmail from "@/Components/Popups/OtpForm";
import SignupForm from "@/Components/Popups/SignupForm";
interface data {
  name: string;
  email: string;
  password: string;
  verifyPassword: string;
}
const initalState: data = {
  name: "",
  email: "",
  password: "",
  verifyPassword: "",
};
export default function signup() {
  
  const [loading, setLoading] = useState(false);
  const [flipSignup,setFlipSignup]=useState(false);
  const [data,setData]=useState({})
  const reducer = (state: data, action: { payload: string; type: string }) => {
    switch (action.type) {
      case "FULL NAME":
        return { ...state, name: action.payload };
        break;
      case "EMAIL":
        return { ...state, email: action.payload };
        break;
      case "PASSWORD":
        return { ...state, password: action.payload };
        break;
      case "CONFIRM PASSWORD":
        return { ...state, verifyPassword: action.payload };
        break;
      case "RESET":
        return initalState;
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, initalState);
  useEffect(()=>{
    setData({name:state.name,email:state.email,password:state.password})
  },[state])
  return (
    <>
      <div className={styles.signup}>
        {loading ? <Loading /> : <></>}
        <div className={styles.singup_topbar}>
          <Link href="/" className={styles.link}>
            <Image src={logo} alt="none" className={styles.logo_image} />
          </Link>
        </div>
        <div className={styles.signup_left}>
          <Image src={signupImage} alt="none" className={styles.signup_image} />
        </div>
        <div className={styles.signup_right}>
          <div className={styles.signup_container}>
            <div className={styles.signup_card}  style={flipSignup?{transform:"rotateY(180deg)"}:{}}>
              <div className={styles.flip_front}>
                <SignupForm state={state} dispatch={dispatch} setLoading={setLoading} setFlipSignup={setFlipSignup}/>
              </div>
              <div className={styles.flip_back}>
                <div className={styles.innerContent}>
                  <VerifyEmail
                  data={data}
                  settogglepopup={setFlipSignup}
                  popUpLogin={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
