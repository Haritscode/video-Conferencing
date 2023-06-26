import { useState, useReducer } from "react";
import Image from "next/image";
import logo from "../assets/logo.svg";
import Link from "next/link";
import styles from "../styles/login.module.scss";
Image;
import VideCall from "../assets/loginpage_image.png";
import Input from "@/Components/Inputs/ReducerInput";
import ToggleSwitch from "@/Components/Inputs/ToggleSwitch";
import Router from "next/router";
import axios from "axios";
import { useLoading, Bars } from "@agney/react-loading";
import GppMaybeIcon from "@mui/icons-material/GppMaybe";
import PasswordInput from "@/Components/Inputs/PasswordInput";
import GoogleIcon from '../assets/Google Icons.png'
interface data {
  email: string;
  password: string;
}
const initalState = {
  email: "",
  password: "",
};
export default function Login() {
  const [showPassword, setShowPassword]: [boolean, Function] = useState(false);
  const [error, setError] = useState({ statusCode: "", text: "" });
  const [loading,setLoading]=useState(false);
  const reducer = (state: { email: string; password: string }, action: any) => {
    switch (action.type) {
      case "EMAIL":
        return { ...state, email: action.payload };
        break;
      case "PASSWORD":
        return { ...state, password: action.payload };
        break;
      case "TEXT":
        return { ...state, password: action.payload };
      default:
        return state;
    }
  };
  const [State, dispatch]: [data, Function] = useReducer(reducer, initalState);

  const login = async () => {
    setLoading(true);
    axios
      .post("http://localhost:4000/auth/login", State)
      .then((response) => {
        if (response.status === 200) {
          Router.push("/");
        }
      })
      .catch((err) => {
        if (
          err?.response?.status === 401 &&
          err?.response?.statusText === "Unauthorized"
        ) {
          setError({ statusCode: "401", text: "Wrong Password" });
        } else if (
          err?.response?.status === 404 &&
          err?.response?.data?.msg === "User Not Found"
          ) {
            setError({ statusCode: "404", text: "User Not Found" });
          }
          setLoading(false);
      });
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
      <main className={styles.login}>
        { loading?
        <div className={styles.loading}>
          <section {...containerProps}>{indicatorEl}</section>
        </div>:<></>
        }
        <div className={styles.login_left_section}>
          <div className={styles.login_head}>
            <Link href="/">
              <Image src={logo} alt="none" className={styles.logo_image} />
            </Link>
            <span className={styles.sigin_page_route}>
              <p>Don't have an account?</p>
              <Link className={styles.signup_btn} href="/signup">
                Sign Up!
              </Link>
            </span>
          </div>
          <div className={styles.login_main}>
            <div className={styles.login_main_heading}>
              <h1 className={styles.login_main_head}>Welcome Back</h1>
              <p className={styles.login_thumbnail}>Login into your account</p>
              <div
                className={styles.error_box}
                style={
                  error.statusCode === "401" || error.statusCode === "404"
                    ? { height: "50px" }
                    : { height: "0" }
                }
              >
                <GppMaybeIcon style={{ color: "white" }} />
                <p
                  className={styles.error_box_msg}
                  style={
                    error.statusCode.length > 0
                      ? { display: "block" }
                      : { display: "none" }
                  }
                >
                  {error.text}
                </p>
              </div>
            </div>
            <div className={styles.login_using_oauth}>
              <button onClick={googleOauth} className={styles.googleOauth}>
                <Image src={GoogleIcon} alt="none" className={styles.google_login}/>
                <p className={styles.login_form}>Login With Google</p>
              </button>
            </div>
            <div className={styles.login_with_email}>
              <hr className={styles.hr} />
              <p className={styles.option_text}>Or Continue with</p>
              <hr className={styles.hr} />
            </div>
            <form
              className={styles.login_form}
              onSubmit={(e) => e.preventDefault()}
            >
              <Input
                type="email"
                placeholder="Email"
                value={State.email}
                setValue={dispatch}
              />
              <div className={styles.password}>
                <PasswordInput
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  setShowPassword={setShowPassword}
                  showPassword={showPassword}
                  value={State.password}
                  setValue={dispatch}
                />
                <div className={styles.password_settings}>
                  <ToggleSwitch lable={"Remember Me"} />
                  <span className={styles.recoverPassword}>
                    Recover Password
                  </span>
                </div>
              </div>
              <button onClick={login} className={styles.Login_Button}>
                Log In
              </button>
              {/* </div> */}
            </form>
          </div>
        </div>
        <div className={styles.login_rigth_section}>
          <Image
            className={styles.Login_page_Template}
            src={VideCall}
            alt="none"
          />
        </div>
      </main>
    </>
  );
}
