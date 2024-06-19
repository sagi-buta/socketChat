import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Socket from "./components/Socket";
import LogIn from "./components/LogIn";
import ChatRooms from "./components/ChatRooms";
import { io } from "socket.io-client";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [socket, setSocket] = useState(io());

  useEffect(() => {
    // const socketIo = io("http://localhost:2500", {
    //   query: { userName: "sagi22" },
    // });
    // socketIo.on("welcome", (data) => console.log("data app", data));
    //   setSocket(socketIo);
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
  return (
    <>
      {!isLoggedIn ? (
        <LogIn
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          socket={socket}
          setSocket={setSocket}
        />
      ) : (
        <ChatRooms socket={socket} setSocket={setSocket} />
      )}
    </>
  );
}

export default App;
