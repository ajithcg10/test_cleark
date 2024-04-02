import React from "react";
import { ChatGroupData, Member } from "../type";
import Image from "next/image";
import groupImage from "@/public/assets/group.png";
import profileImage from "@/public/assets/person.jpg";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { UpdateSeenMessage } from "../lib/message.actions";

interface chatBoxProps {
  chat: ChatGroupData;
  currentUserID: string;
  currentChatID?: string;
}

export default function ChatBox({
  chat,
  currentUserID,
  currentChatID,
}: chatBoxProps) {
  const router = useRouter();
  const otheMembers = chat.members.filter((i) => i._id !== currentUserID);

  const latestMessage =
    chat?.message?.length > 0 ? chat.message[chat.message.length - 1] : null;
  const seen =
    latestMessage?.seenBy &&
    latestMessage.seenBy.find(
      (member: Member | any) => member._id === currentUserID
    );
  console.log(chat);

  return (
    <div
      className={`chat-box hover:bg-blue-400 ${
        chat._id === currentChatID ? "bg-blue-400" : ""
      }`}
      onClick={() => router.push(`chats/${chat._id}`)}
    >
      <div className="chat-info">
        {chat.isGroup ? (
          <Image
            src={chat?.groupPhoto || groupImage}
            alt="Profile-Image"
            width={100}
            height={100}
            className="profilePhoto"
            priority
          />
        ) : (
          <Image
            src={otheMembers[0]?.profileImage || profileImage}
            alt="Profile-Image"
            width={100}
            height={100}
            className="profilePhoto"
            priority
          />
        )}
        <div className="flex flex-col gap-1">
          {chat.isGroup ? (
            <p className="text-base-bold">{chat?.name}</p>
          ) : (
            <p className="text-base-bold">{otheMembers[0]?.userName}</p>
          )}
          {!latestMessage && <p className="text-semi-bold">Start New Chat</p>}
          {latestMessage?.photo ? (
            latestMessage?.sender._id === currentUserID ? (
              <p
                className={`last-message ${
                  seen
                    ? "text-small-bold text-grey-3"
                    : "text-small-bold font-bold"
                }`}
              >
                {" "}
                you sent a Photo
              </p>
            ) : (
              <p
                className={`last-message ${
                  seen
                    ? "text-small-bold text-grey-3"
                    : "text-small-bold font-bold"
                }`}
              >
                {" "}
                Recived Photo
              </p>
            )
          ) : (
            <p
              className={`last-message ${
                seen ? "text-small-bold text-grey-3" : "text-small-bold"
              }`}
            >
              {latestMessage?.text}
            </p>
          )}
        </div>
        <div>
          <p className="text base ligth text-grey-3">
            {" "}
            {!latestMessage && format(new Date(chat?.createdAt), "p")}
            {latestMessage && format(new Date(chat.lastMessageAt), "p")}
          </p>
        </div>
      </div>
    </div>
  );
}
