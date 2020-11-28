//ref: https://github.com/MaxBittker/walky/blob/master/src/state.ts
// import React, {useContext, useEffect} from 'react';
// import SocketContext from "./SocketContext";
const data = {
  me: {
    name: "",
    id: "",
    avatar: null,
    room: null,
    x: null,
    y: null,
    destinationX: null,
    destinationY: null,
    message: "",
  },
  players: [],
};

const getData = () => {
  return data;
};

export { getData };
