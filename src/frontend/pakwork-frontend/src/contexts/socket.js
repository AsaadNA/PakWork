import io from "socket.io-client";
import React from "react";

export const socket = io("http://localhost:4000/", {
  transports: ["websocket"],
  query: `token=${localStorage.getItem("userToken")}`,
});

export const SocketContext = React.createContext();
