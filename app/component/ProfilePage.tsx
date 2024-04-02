"use client";
import React, { useEffect, useState } from "react";
import FilUpload from "./FilUpload";
import { SubmitHandler, useForm } from "react-hook-form";
import { PersonOutline } from "@mui/icons-material";
import Loader from "./Loader";
import { UserUpdate, getUserData_ById } from "../lib/auth.actions";
import { UserDataProps } from "../type";
import { useRouter } from "next/navigation";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
type Inputs = {
  userName: string;
};
export default function ProfilePage() {
  const [loading, setLoading] = useState(false);
  const [IsSucess, setSucess] = useState(false);
  const [file, setFile] = useState<string>("");
  const [datafile, setDataFile] = useState<UserDataProps>();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  useEffect(() => {
    const fetch_data = async () => {
      const email = localStorage.getItem("email");
      const userdata = await getUserData_ById({ userId: email! });
      setDataFile(userdata);
    };
    fetch_data();
  }, [IsSucess]);
  const onupload = (result: any) => {
    setFile(result?.info?.secure_url);
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (datafile) {
      const userId = datafile?.data?.loginDetails._id;

      if (datafile) {
        const useUpdate = await UserUpdate({
          userId: userId,
          user: {
            ...datafile.data.loginDetails,
            profileImage: file,
            userName: data.userName,
          },
          path: "/profile",
        });
        if (useUpdate) {
          setSucess(true);

          router.push("/profile");
        }
      }
    }
  };
  console.log(file, "ajith");

  const userImage = datafile?.data?.loginDetails?.profileImage;
  const userName = datafile?.data?.loginDetails?.userName.toUpperCase();
  return loading ? (
    <Loader />
  ) : (
    <div className="profile-page">
      <h1 className="font-semibold">{userName}</h1>
      <form className="edit-profile" onSubmit={handleSubmit(onSubmit)}>
        <div className="input">
          <input
            {...register("userName", {
              required: "Username is required",
              validate: (value) => {
                if (value.length < 3) {
                  return "Username must be at least 3 characters";
                }
              },
            })}
            type="text"
            placeholder="Update Username"
            className="input-field"
          />
          <PersonOutline sx={{ color: "#737373" }} />
        </div>
        {errors?.userName && (
          <p className="text-red-500">{errors.userName.message}</p>
        )}

        <div className="flex items-center justify-between">
          <Image
            src={file || userImage || "/assets/person.jpg"}
            alt="profile"
            className="w-40 h-40 rounded-full"
            width={100}
            height={100}
          />
          <CldUploadButton
            uploadPreset="qeccdbls"
            options={{ maxFiles: 1 }}
            onUpload={onupload}
          >
            <p className="font-bold">Update YOUr Profile</p>
          </CldUploadButton>

          {/* <FilUpload setFile={setFile} /> */}
        </div>

        <button className="btn bg-blue-800" type="submit">
          Save Changes
        </button>
      </form>
    </div>
  );
}
