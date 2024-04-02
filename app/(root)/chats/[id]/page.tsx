"use client";
import ChatDeatils from "@/app/component/ChatDeatils";
import ChatList from "@/app/component/ChatList";
import { getUserData_ById } from "@/app/lib/auth.actions";
import { UpdateSeenMessage } from "@/app/lib/message.actions";
import React, { useEffect } from "react";

interface ChatIdprops {
  params: {
    id: string;
  };
}
export default function ChatPage({ params: { id } }: ChatIdprops) {
  const chatId = id;

  useEffect(() => {
    const fetch_data = async () => {
      const email = localStorage.getItem("email");
      const userdata = await getUserData_ById({ userId: email! });
      console.log(userdata.data?.loginDetails?.email);

      const res = await UpdateSeenMessage({
        chatId: chatId,
        currentUserId: userdata.data?.loginDetails?._id,
      });
    };
    fetch_data();
  }, [chatId]);

  return (
    <div className="main-container p:0 sm:px-10 sm:py-3 ">
      <div className="w-2/5 max-lg:hidden  ">
        <ChatList currentChatId={chatId} />
      </div>
      <div className="w-4/5 max-lg:w-full ">
        <ChatDeatils chatId={chatId} />{" "}
      </div>
    </div>
  );
}
