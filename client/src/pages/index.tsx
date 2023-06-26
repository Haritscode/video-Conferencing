import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '../styles/Index.module.scss'
import Navbar from '@/Components/Navbar/Navbar'
import HomePage from '@/Components/Home/HomePage'
const inter = Inter({ subsets: ['latin'] })
export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="logo.avif" />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:wght@500&display=swap" rel="stylesheet"/>
      </Head>
      <main>
        <div className={styles.Main}>
          <Navbar/>
          <HomePage/>
        </div>
      </main>
    </>
  )
}
