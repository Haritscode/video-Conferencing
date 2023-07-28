import React from 'react';
import FriendRequestCard from './card/RequestsCard';
import styles from './requests.module.scss';
import { useSelector } from 'react-redux';
interface propsType{
  state:any,
  dispatch:Function
}
interface initailState{
  email:String,
  name:String,
  profileUrl:string
}
export default function Requests({state,dispatch}:propsType) {
  const requests=useSelector((state:any)=>state.chats.requestList)
  return (
    <>
      <ol className={styles.requests} style={requests.length>0?{height:'200px'}:{height:'0'}}>
        <hr />
        <h4 className={styles.requests_heading}>Requests</h4>
        {
          requests?.map(({name,email,profileUrl}:initailState,count:number)=><FriendRequestCard key={count} type={"accept_decline"} name={name} email={email} profileUrl={profileUrl} found={-1} dispatch={dispatch} state={state}/> )
        }
      </ol>
    </>
  )
}
