import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import { io } from "socket.io-client";
import axios from "axios";

export default function LogIn({ loggedIn, setIsLoggedIn, socket, setSocket }) {
  // const [socket, setSocket] = useState(io());

  // useEffect(
  //   () => {
  //     const socketIo = io("http://localhost:2500", {
  //       query: { userName: userName },
  //     });
  //     socket.on("welcome userName", (data) => {
  //       console.log("welcome to chat, your id:", data);
  //     });
  //   },
  //   [userName],
  //   []
  // );

  const [userName, setUserName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let resData = await axios
      .get(`http://localhost:2500/user/uName?filter=${userName}`)
      .catch((err) => console.log(err));
    if (resData.data)
      throw "userName is already in use please choose a different";

    const socketIo = io("http://localhost:2500", {
      query: { userName: userName },
    });
    setSocket(socketIo);
    setIsLoggedIn((prev) => !prev);
    // setLoggedIn(!loggedIn);
  };

  return (
    <div className={styles.hiro}>
      <h1>{"WELCOME TO MY CHAT !"}</h1>

      <h2>Choose a username</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <button
          type="submit"
          // onClick={() => {
          //   props.socket.emit("username", { username: userName });
          //   setUserName("");
          // }}
        >
          Enter
        </button>
      </form>
      {/* <input type="text"  />

      <button
        onClick={() => {
          props.setIsLoggedIn((prev) => !prev);
        }}
      >
        Enter
      </button> */}
    </div>
  );
}
