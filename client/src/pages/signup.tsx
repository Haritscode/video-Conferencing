import { useState, useReducer, useEffect } from "react";
import styles from "../styles/signup.module.scss";
import signupImage from "../assets/signup_image.avif";
import logo from "../assets/logo.svg";
import Image from "next/image";
import Link from "next/link";
import Input from "@/Components/Inputs/ReducerInput";
import PasswordInput from "@/Components/Inputs/PasswordInput";
import axios from "axios";
import { useLoading, Bars } from "@agney/react-loading";
import Router from "next/router";
import GoogleIcon from '../assets/Google Icons.png'
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
  const [showPassword, setShowPassword]: [boolean, Function] = useState(false);
  const [showVerifyPassword, setShowVerfiyPassword]: [boolean, Function] =
    useState(false);
  const [showConfirmPasswordError, setshowConfirmPasswordError]: [
    boolean,
    Function
  ] = useState(false);
  const [showEmptyFieldError, setShowEmptyFieldError] = useState(false);
  const [isUserExists, setIsUserExists] = useState(false);
  const [loading, setLaoding] = useState(false);
  const [isServerError,setIsServerError]=useState(false);
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
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, initalState);
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
    setLaoding(true);
    if (
      state?.name?.length > 0 &&
      state?.email?.length > 8 &&
      state?.password?.length > 0 &&
      state?.verifyPassword?.length > 0 &&
      !showConfirmPasswordError
    ) {
      axios
        .post("http://localhost:4000/auth/signup", {
          name: state.name,
          email: state.email,
          password: state.password,
        })
        .then((result) => {
          if (result.status === 200) {
            Router.push("/login");
          }
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status === 409) {
            setIsUserExists(true);
          }
          else if(err.response.status===404)
          {
            setIsServerError(true);
          }
          setLaoding(false);
        });
    }
  };
  useEffect(()=>{
    if(isUserExists)
    {
      setIsUserExists(false);
    }
  },[state.email])
  const ValidateFields = () => {
    setShowEmptyFieldError(true);
    if (
      state?.name?.length > 0 &&
      state?.email?.length > 0 &&
      state?.password?.length > 0 &&
      state?.password !== state?.verifyPassword
    ) {
      setshowConfirmPasswordError(true);
    }
  };
  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    indicator: <Bars width="50" />,
  });
  const googleOauth=()=>{
    window.location.href="http://localhost:4000/auth/google/callback";
  }
  return (
    <>
      <div className={styles.signup}>
        {loading ? (
          <div className={styles.loading}>
            <section {...containerProps}>{indicatorEl}</section>
          </div>
        ) : (
          <></>
        )}
        <div className={styles.singup_topbar}>
          <Image src={logo} alt="none" />
          <div className={styles.login_route}>
            <p className={styles.login_msg}>have an account?</p>
            <Link href="/login" className={styles.login_btn}>
              Sign in!
            </Link>
          </div>
        </div>
        <div className={styles.signup_left}>
          <Image src={signupImage} alt="none" className={styles.signup_image} />
        </div>
        <div className={styles.signup_right}>
          <span className={styles.singup_heading}>
            <h1 className={styles.h1}>Get Started with WORKHOMII</h1>
            <p className={styles.signup_thumbnail}>Getting started is easy</p>
          </span>
          <div className={styles.signup_using_google}>
            <button onClick={googleOauth} className={styles.googleOauth}>
                <Image src={GoogleIcon} alt="none" className={styles.google_login}/>
                <p className={styles.login_form}>Signup With Google</p>
              </button>
          </div>
          <div className={styles.login_with_email}>
            <hr className={styles.hr} />
            <p className={styles.option_text}>Or Continue with</p>
            <hr className={styles.hr} />
          </div>
          <form onSubmit={createAccount} className={styles.signup_form}>
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
              <p
                style={
                  showEmptyFieldError
                    ? { display: "block" }
                    : { display: "none" }
                }
                className={styles.error_msg}
              >
                {state?.name?.length < 1 &&
                state?.email?.length < 1 &&
                state?.password?.length < 1
                  ? "Name, email and password should not be empty"
                  : state?.name?.length < 1 && state?.email?.length < 1
                  ? "Name and email should not be empty"
                  : state?.name?.length < 1
                  ? "Name should not be empty"
                  : state?.email?.length < 1
                  ? "Email should not be empty"
                  : state?.password?.length < 1
                  ? "Password should not be empty"
                  : isUserExists
                  ? "Email Already exists"
                  : isServerError
                  ? "Some Server Error Occured":""}
              </p>
              <button
                onClick={ValidateFields}
                className={styles.create_account_btn}
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
