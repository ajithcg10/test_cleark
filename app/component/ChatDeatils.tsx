"use client";
import React, { useEffect, useRef, useState } from "react";
import { getByIdChat } from "../lib/chat.actions";
import { ChatGroupData, Member } from "../type";
import { getUserData_ById } from "../lib/auth.actions";
import profileImage from "@/public/assets/person.jpg";
import Link from "next/link";
import Image from "next/image";
import { AddPhotoAlternate } from "@mui/icons-material";
import { Create_Message } from "../lib/message.actions";
import { CldUploadButton } from "next-cloudinary";
import MessageBox from "./MessageBox";
import { pusherClient } from "../../pusher/pusher";

interface DeatilsProps {
  chatId: string;
}
export default function ChatDeatils({ chatId }: DeatilsProps) {
  const [chat, setChat] = useState<ChatGroupData>({
    _id: "",
    members: [],
    message: [],
    isGroup: false,
    name: "",
    groupPhoto: "",
    lastMessageAt: new Date(),
    createdAt: new Date(),
    __v: 0,
  });
  const [dataID, setDataId] = useState("");
  const [otheMembers, setOthemebers] = useState<Member[]>([]);
  const [text, setText] = useState("");
  const [photo, setPhoto] = useState("");

  useEffect(() => {
    const fetch_data = async () => {
      const chatresult = await getByIdChat(chatId);
      const email = localStorage.getItem("email");
      const userdata = await getUserData_ById({ userId: email! });
      const current_id = userdata.data?.loginDetails?._id;
      setDataId(userdata.data?.loginDetails?._id);
      setChat(chatresult);
      setOthemebers(
        chatresult.members.filter((member: Member) => member._id !== current_id)
      );
    };
    fetch_data();
  }, [chatId]);

  const onupload = async (result: any) => {
    const newmessage = await Create_Message({
      chatId: chatId,
      currentUserId: dataID,
      photo: result?.info?.secure_url,
    });

    setPhoto(result?.info?.secure_url);
  };

  const SendText = async (result: any) => {
    const newmessage = await Create_Message({
      chatId: chatId,
      currentUserId: dataID,
      text: text,
    });
    setText("");
  };

  useEffect(() => {
    pusherClient.subscribe(chatId);

    const handleMessage = async (newMessage: any) => {
      setChat((prevChat) => {
        return {
          ...prevChat,
          message: [...prevChat.message, newMessage],
        };
      });
    };

    pusherClient.bind("new-message", handleMessage);

    return () => {
      pusherClient.unsubscribe(chatId);
      pusherClient.unbind("new-message", handleMessage);
    };
  }, [chatId]);

  const bottofRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottofRef.current) {
      bottofRef.current?.scrollIntoView({ behavior: "smooth" }); // Optional chaining
    } else {
      // Handle the case where bottofRef.current is null (optional)
    }
  }, [chat.message]);
  return (
    <div className="chat-details">
      <div className="chat-header">
        {chat.isGroup ? (
          <>
            <Link href="/">
              <Image
                src={chat.groupPhoto || "/assets/group.png"}
                alt="profile"
                width={100}
                height={100}
                className="profilePhoto"
                priority
              />
            </Link>
            <div className=" flex flex-col gap-1">
              <p>
                {" "}
                {chat?.name} &#160; &#183; &#160; {chat?.members?.length}{" "}
                members
              </p>
            </div>
          </>
        ) : (
          <>
            <Image
              src={otheMembers[0]?.profileImage || profileImage}
              alt="profile"
              width={100}
              height={100}
              className="profilePhoto"
              priority
            />
            <div className="text">
              <p>{otheMembers[0]?.userName}</p>
            </div>
          </>
        )}
      </div>
      <div className="chat-body ">
        {chat?.message.map((message) => {
          return (
            <MessageBox
              key={message?._id}
              message={message}
              currentUserId={dataID}
            />
          );
        })}
        <div ref={bottofRef} />
      </div>
      <div className="send-message">
        <div className="prepare-message">
          <CldUploadButton
            uploadPreset="qeccdbls"
            options={{ maxFiles: 1 }}
            onUpload={onupload}
          >
            <AddPhotoAlternate
              sx={{
                fontSize: "25px",
                color: "#737373",
                cursor: "pointer",
                "&:hover": { color: "red" },
              }}
            />
          </CldUploadButton>
          <input
            className="outline-none"
            type="text"
            placeholder="write a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
        </div>

        <div onClick={SendText}>
          <Image
            src="/assets/send.jpg"
            alt="send-icon"
            width={100}
            height={100}
            className="send-icon"
          />
        </div>
      </div>
    </div>
  );
}
