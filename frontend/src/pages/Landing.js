import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { api_url } from "../helpers";

const socket = io(api_url);

function Landing() {
  const [count, setCount] = useState(0);
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");

  useEffect(() => {
    socket.on("JumlahUser", updateUserCount);
    socket.on("chat", updateChat);
  }, []);

  const updateUserCount = (num) => {
    setCount(num);
  };

  const updateChat = (str) => {
    setChat((chat) => [...chat, str]);
  };

  const click = () => {
    socket.emit("chat", { message, room });
    setMessage("");
  };

  const channelBtn = (roomName) => {
    if (room.length > 0) socket.emit("leave room", room);
    setRoom(roomName);
    socket.emit("join room", roomName);
  };

  return (
    <div className="container">
      <h3 className=" text-center">Online User: {count}</h3>
      <button onClick={() => channelBtn("general")}>general</button>
      <button onClick={() => channelBtn("testing")}>testing</button>
      <div className="messaging">
        <div className="inbox_msg">
          <div className="mesgs">
            <div>
              {chat.map((val) => (
                <div>{val}</div>
              ))}
            </div>
            <div className="type_msg">
              <div className="input_msg_write">
                <input
                  type="text"
                  className="write_msg"
                  placeholder="Type a message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button className="msg_send_btn" type="button" onClick={click}>
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
