"use client";
import React, { useEffect, useState } from "react";
import { getUserData_ById } from "../lib/auth.actions";
import { ChatGroupData, UserDataProps } from "../type";
import { getAllChat } from "../lib/chat.actions";
import ChatBox from "./ChatBox";
import { pusherClient } from "@/pusher/pusher";

interface ChatListProps {
  currentChatId?: string;
}

export default function ChatList({ currentChatId }: ChatListProps) {
  const [dataFile, setDataFile] = useState("");
  const [chatList, setChatList] = useState<ChatGroupData[]>([]);
  const [serach, setSerach] = useState<string>();

  useEffect(() => {
    const fetch_data = async () => {
      const email = localStorage.getItem("email");
      const userdata = await getUserData_ById({ userId: email! });

      setDataFile(userdata.data?.loginDetails?._id);
      const res = await getAllChat({
        userID: userdata.data?.loginDetails?._id,
        params: serach,
      });
      setChatList(res);
    };
    fetch_data();
  }, [serach]);
  console.log(dataFile);

  useEffect(() => {
    pusherClient.subscribe(dataFile);
    const handleChatUpdate = (updatedChat: any) => {
      setChatList((allChats) =>
        allChats.map((chat) => {
          if (chat._id === updatedChat.id) {
            return { ...chat, message: updatedChat.message };
          } else {
            return chat;
          }
        })
      );
    };

    pusherClient.bind("update-chat", handleChatUpdate);
    return () => {
      pusherClient.unsubscribe(dataFile);
      pusherClient.unbind("update-chat", handleChatUpdate);
    };
  }, [dataFile]);
  return (
    <div className="chat-list">
      <input
        placeholder="Search chat..."
        className="input-search"
        value={serach}
        onChange={(e) => setSerach(e.target.value)}
      />
      <div className="chats">
        {chatList.map((data) => {
          return (
            <ChatBox
              key={data._id}
              chat={data}
              currentUserID={dataFile}
              currentChatID={currentChatId}
            />
          );
        })}
      </div>
    </div>
  );
}
