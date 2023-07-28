import {io} from 'socket.io-client';
let socket=io('ws://localhost:4000',{
        withCredentials:true,
        upgrade:true,
    }
);
export default socket;