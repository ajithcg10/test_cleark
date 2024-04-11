import Contact from "@/app/component/Contact";
import { auth } from "@clerk/nextjs";
import React from "react";

export default function Contacts() {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  return (
    <div className="wrapper">
      <Contact userId={userId} />
    </div>
  );
}
