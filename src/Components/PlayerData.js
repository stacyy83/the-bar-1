//ref: https://github.com/MaxBittker/walky/blob/master/src/state.ts
// import React, {useContext, useEffect} from 'react';
// import SocketContext from "./SocketContext";
const data = {
  me: {
    name: "",
    playerId: "",
  },
  players: [],
};

// const updateData = () =>{
//   const socket = useContext(SocketContext);
//   useEffect(()=>{
//     socket.on('join', (data)=>{

//     });
//   })
// }




const getData = () => {
  return data;
};

export { getData };
