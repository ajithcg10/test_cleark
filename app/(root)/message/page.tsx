"use client";
import React from "react";
import ModalImage from "react-modal-image";

export default function page() {
  return (
    <div>
      <ModalImage
        small={"/assets/andrew.jpg"}
        large={"/assets/andrew.jpg"}
        alt="Hello World!"
      />
      ;
    </div>
  );
}
