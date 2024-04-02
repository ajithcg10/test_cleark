import ChatList from "@/app/component/ChatList";
import React, { useEffect } from "react";
import Contacts from "../contacts/page";

export default function Chtas() {
  // Render component
  return (
    <div className="main-container wrapper">
      <div className="w-1/3 max-lg:w-1/2 max-md:w-full">
        <ChatList />
      </div>
      <div className="w-2/3 max-lg:w-1/2 max-md:hidden">
        <Contacts />
      </div>
    </div>
  );
}
