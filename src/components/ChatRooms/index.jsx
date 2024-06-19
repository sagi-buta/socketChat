import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import axios from "axios";

export default function ChatRooms({ socket, setSocket }) {
  const [title, setTitle] = useState("");
  const [rooms, setRooms] = useState([]);
  const [myRoom, setMyRoom] = useState("Loby");
  const [msgesList, setMsgesList] = useState([]);
  const [input, setInput] = useState("");
  //----first up
  useEffect(
    () => {
      socket.on("welcomeUserName", (data) => {
        console.log("welcome to chat, your info:", data);
        setTitle(data.uName);
      });

      socket.emit("getRoomsList");
      socket.on("roomsList", (data) => {
        console.log("rooms", data);
        setRooms(data);
        // setMyRoom(data[0]);
      });
    },
    [],
    [socket]
  );

  useEffect(() => {
    socket.on("join", (data) => {
      console.log(data);
    });
    socket.on("msg-server", (msg) => {
      setMsgs((prev) => [...prev, msg]);
    });
  }, [socket]);
  //---send
  const handleSend = (e) => {
    setMsgesList([
      ...msgesList,
      { name: myRoom, time: new Date(), msg: input },
    ]);
    setInput("");
  };

  const getInRoom = (room) => {
    socket.emit("joinRoom", room);
    socket.on("joinedRoom", (data) => {
      setMyRoom(data);
    });
    socket.on("joinMsg", (data) => {
      console.log(data, "msg");
      setMsgesList((prev) => [...prev, data]);
    });
  };

  return (
    <>
      <h2>{` | 👤  ${title} connected`}</h2>
      <div className={styles.hiro}>
        <div className={styles.content}>
          <h2>{`ROOM:${myRoom}`}</h2>
          <ul className={styles.msgesList}>
            {msgesList &&
              msgesList.map((msg, i) => {
                return (
                  <li key={Math.random + i} className={styles.msg}>
                    <div>
                      <h3>{msg.name}</h3>|<p>{msg.time}</p>
                    </div>
                    <p>{msg.msg}</p>
                  </li>
                );
              })}
          </ul>
          <div className={styles.textarea}>
            <textarea
              onInput={(e) => setInput(e.target.vlue)}
              value={input}
            ></textarea>
            <button onClick={handleSend}>send</button>
          </div>
        </div>
        <div className={styles.navrooms}>
          <ul>
            {rooms &&
              rooms.map((room, i) => {
                return (
                  <li
                    key={Math.random + i}
                    className={styles.room}
                    onClick={() => getInRoom(room)}
                  >
                    <h3>{room}</h3>
                  </li>
                );
              })}
          </ul>
          <h3>{myRoom}</h3>
        </div>
      </div>
    </>
  );
}
