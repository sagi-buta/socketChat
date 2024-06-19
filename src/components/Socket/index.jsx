import React, { useEffect } from "react";
import { io } from "socket.io-client";

export default function Socket() {
  useEffect(() => {
    const socket = io("http://localhost:2500");
    // socket.on("connect", () => {
    //   console.log("connected");
    // });
    // socket.on("disconnect", () => {
    //   console.log("disconnected");
    // });
    // socket.on("message", (message) => {
    //   console.log(message);
    // });
    // socket.emit("message", "hello");
    // return () => {
    //   socket.disconnect();
    // };
  }, []);
  return;
}
