"use client";

import { useEffect, useState } from "react";
import Loader from "./Loader";
import { CheckCircle, RadioButtonUnchecked } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { get_All_Conatct } from "../lib/user.actions";
import { LoginDetailsProps } from "../type";
import Image from "next/image";
import { create_chat } from "../lib/chat.actions";

const Contact = () => {
  const [loading, setLoading] = useState();
  const [contacts, setContacts] = useState([]);
  const [search, setSerach] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [select, setSelect] = useState<LoginDetailsProps[]>([]);
  const [currentid, setCurrentId] = useState<LoginDetailsProps[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetch_data = async () => {
      const data_list = await get_All_Conatct(search);
      const email = localStorage.getItem("email");
      const currentUser = data_list?.filter(
        (item: LoginDetailsProps) => item.email == email
      );
      setCurrentId(currentUser);
      const data_filter = data_list?.filter(
        (item: LoginDetailsProps) => item.email !== email
      );
      setContacts(data_filter);
    };
    fetch_data();
  }, [search]);

  console.log(select);

  const handleInputChange = (event: any) => {
    setSerach(event.target.value);
  };
  const handleSelect = (userContact: LoginDetailsProps) => {
    const isSelected = select.some(
      (selectedContact) => selectedContact._id === userContact._id
    );

    console.log(isSelected, "ajit");

    if (isSelected) {
      setSelect((prev) => prev.filter((c) => c._id !== userContact._id));
    } else {
      setSelect((prev) => [...prev, userContact]);
    }
  };
  const isGroup = select.length > 1;

  const id = currentid[0]?._id;
  const createChat = async () => {
    const response = await create_chat({
      user: {
        isGroup: isGroup,
        currentUser: id,
        members: [...select],
        name: name,
      },
    });
    if (response) {
      router.push(`/chats/${response._id}`);
    }
  };

  return (
    <div className="create-chat-container ">
      <input
        placeholder="Search contact..."
        className="input-search"
        value={search}
        onChange={handleInputChange}
      />
      <div className="contact-bar">
        <div className="contact-list">
          <p className="font-bold">Select or Deselect</p>
          {contacts.map((item: LoginDetailsProps) => {
            return (
              <div
                key={item._id}
                className="contact"
                onClick={() => handleSelect(item)}
              >
                {select.find((c) => c === item) ? (
                  <CheckCircle />
                ) : (
                  <RadioButtonUnchecked />
                )}

                <Image
                  src={item.profileImage || "/assets/person.jpg"}
                  className="profilePhoto object-contain"
                  alt="profile"
                  width={100}
                  height={100}
                  priority
                />
                <p className="text-base-bold">{item.userName}</p>
              </div>
            );
          })}
        </div>
        <div className="create-chat">
          {isGroup && (
            <>
              <div className="flex flex-col gap-3">
                <p className="text-body-bold">Group Chat Name</p>
                <input
                  placeholder="Enter group chat name..."
                  className="input-group-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-body-bold">Members</p>
                <div className="flex flex-wrap gap-3">
                  {select.map((contact, index) => (
                    <p className="selected-contact" key={index}>
                      {contact.userName}
                    </p>
                  ))}
                </div>
              </div>
            </>
          )}
          <button className="btn bg-blue-800" onClick={createChat}>
            FIND OR START A NEW CHAT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
