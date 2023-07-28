interface initalStateType{
    showRequests: boolean,
    searchUser: String,
    invitedUserInfo:Object,
    requests:Array<any>
}
const intialState:initalStateType={
    showRequests:false,
    searchUser:"",
    invitedUserInfo:{},
    requests:[]
}
const chatReducer=(state:any,action:any)=>{
    switch (action.type){
      case "SHOWREQUESTS":
        return {...state,showRequests:!state.showRequests}
      case "SEARCHUSER":
        return {...state,searchUser:action.payload};
      case "INVITEDUSERINFO":
        return {...state,invitedUserInfo:action.payload};
      case "REQUESTS":
        return {...state,requests:action.payload};
      default:
        return state;
    }
}
export {chatReducer,intialState};