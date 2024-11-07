"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import io from "socket.io-client";
import { useSelector } from "react-redux";

export default function Chat() {
  const router = useRouter();
  const [mes, setMes] = useState("");
  const [socket, setSocket] = useState(null);
  const [chat, setChat] = useState([]);
  const receiverId = useSelector((state) => state.globalValues.messageReceiver);
  const messages = useSelector((state) => state.globalValues.messages || []);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (messages && messages.length > 0) {
      setChat(messages);
      console.log(messages, "jjjjkkkk");
    }
  }, []);

  useEffect(() => {
    const socketInstance = io("http://localhost:3000"); // Connecting to the same port

    socketInstance.on("connect", () => {
      console.log("Connected to socket server");
      setUserId(socketInstance.id);
    });

    socketInstance.on("message", (message) => {
      setChat((prevMessages) => [...prevMessages, message]);
    });

    setSocket(socketInstance);

    // Clean up the connection when the component is unmounted
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const addMes = () => {
    if (mes !== "") {
      const newMessage = {
        personId: userId,
        receiver: receiverId,
        content: mes,
        time: new Date().toISOString(),
      };

      if (socket) {
        socket.emit("message", newMessage);
      } else {
        console.log("Socket is not initialized");
      }
      setMes("");
    }
  };
  const userImg = [
    "",
    "https://img.freepik.com/free-vector/profile-picture-design_742173-13765.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1721952000&semt=ais_user",
    "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg",
  ];

  const back = () => {
    router.push("productDetails");
  };
  console.log(chat, "haiiiiii");
  return (
    <div className="p-3 h-[100vh] overflow-scroll justify-between flex flex-col">
      <div className=" message sticky top-[10px] flex w-[600px] mx-auto items-center gap-[20px] bg-blue-200 rounded-[50px] px-7 py-2">
        <i onClick={back} className="fa-solid fa-arrow-left"></i>
        <div className="rounded-full w-[50px] ">
          <img
            className="rounded-full "
            src="https://img.freepik.com/free-vector/profile-picture-design_742173-13765.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1721952000&semt=ais_user"
            alt=""
          />
        </div>
        <p>Hidesh Chaudery </p>
      </div>
      <div className="flex flex-col gap-[50px] py-[70px]">
        {chat.map((content, index) => (
          <div
            key={index}
            className={`flex ${
              content.personId === userId || content.receiver === receiverId
                ? "flex-row-reverse"
                : "flex-row"
            } gap-[10px]`}
          >
            <div className="rounded-full w-[50px]">
              <img
                className="rounded-full"
                src={userImg[content.personId]}
                alt=""
              />
            </div>
            <p
              className={`${
                content.personId === userId || content.receiver === receiverId
                  ? "bg-blue-700"
                  : "bg-gray-500"
              } py-3 px-10 rounded-2xl text-white`}
            >
              {content.content}
            </p>
          </div>
        ))}
      </div>
      <div className="sticky bottom-[10px] flex justify-center">
        <div className="message bg-white rounded-3xl px-5 py-3">
          <input
            onChange={(e) => setMes(e.target.value)}
            value={mes}
            type="text"
            className=" w-[400px] rounded-3xl"
          />
          <i onClick={addMes} className="fa-solid fa-paper-plane"></i>
        </div>
      </div>
    </div>
  );
}
