import '@/styles/globals.scss'
import { useState } from 'react';
import type { AppProps } from 'next/app'
import Login from '@/Components/Popups/PopUp';
import styles from '@/styles/_app.module.scss';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
function App({ Component, pageProps }: AppProps) {
  const [popUpLogin,setPopUpLogin]=useState<boolean>(false);
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