import Form from "@/app/component/Form";
import React from "react";
import { SignIn } from "@clerk/nextjs";

export default function Register() {
  return (
    <div>
      <SignIn />
      {/* <Form type="register" /> */}
    </div>
  );
}
