import React from "react";
import { MessageDataProps } from "../type";
import Image from "next/image";
import { formatDate } from "date-fns";
import ModalImage from "react-modal-image";

interface MessageBoxProps {
  message: MessageDataProps;
  currentUserId: string;
}

export default function MessageBox({
  message,
  currentUserId,
}: MessageBoxProps) {
  return (
    <>
      {message?.sender?._id !== currentUserId ? (
        <div className="message-box">
          <Image
            src={message?.sender?.profileImage || "/assets/person.jpg"}
            alt="profile"
            width={100}
            height={100}
            className="message-profilePhoto"
            priority
          />
          <div className="message-info">
            <p className="text-small-bold">
              {message?.sender?.userName} &#160; &#183; &#160;{" "}
              {formatDate(new Date(message?.createdAt), "p")}
            </p>
            {message?.text?.length != 0 ? (
              <p className="message-text">{message?.text}</p>
            ) : (
              <ModalImage
                small={message?.photo}
                large={message?.photo}
                alt="Image"
                imageBackgroundColor="rgba(255, 255, 255, 0)"
                className="message-photo w-1/2 mr-auto"
              />
              // <Image
              //   src={message?.photo}
              //   alt="image-message"
              //   width={100}
              //   className="message-photo"
              //   height={100}
              //   priority
              // />
            )}
          </div>
        </div>
      ) : (
        <div className="message-box justify-end">
          <div className="message-info items-end">
            <p className="tex-small-bold">
              {formatDate(new Date(message?.createdAt), "p")}
            </p>
            {message.text ? (
              <p className="message-text-sender rounded-full">
                {message?.text}
              </p>
            ) : (
              <ModalImage
                small={message?.photo}
                medium={message?.photo}
                alt="Image"
                imageBackgroundColor="rgba(255, 255, 255, 0)"
                className="message-photo w-1/2 ml-auto"
              />
              // <Image
              //   src={message?.photo}
              //   alt="image-message"
              //   width={100}
              //   className="message-photo"
              //   height={100}
              //   priority
              // />
            )}
          </div>
        </div>
      )}
    </>
  );
}
