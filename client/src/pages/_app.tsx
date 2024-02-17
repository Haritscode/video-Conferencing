import '@/styles/globals.scss'
import { useState,useEffect } from 'react';
import type { AppProps } from 'next/app'
import Login from '@/Components/Popups/PopUp';
import styles from '@/styles/_app.module.scss';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import socket from '@/config/socket.io';
function App({ Component, pageProps }: AppProps) {
  const [popUpLogin,setPopUpLogin]=useState<boolean>(false);
  useEffect(()=>{
    const handleBeforeUnload=()=>{
      socket.disconnect();
    }
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  },[])
  return <>
  <Provider store={store}>
    <div className={styles.login_component} style={popUpLogin?{}:{display:"none"}}>
      <Login setPopUpLogin={setPopUpLogin} popUpLogin={popUpLogin}/>
    </div>
    <Component {...pageProps} />
  </Provider>
  </>
}

export default (App);