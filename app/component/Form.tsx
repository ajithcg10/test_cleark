"use client";
import React, { useState } from "react";
import {
  EmailOutlined,
  LockOutlined,
  PersonOutline,
} from "@mui/icons-material";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { AuthCreate, AuthLogin, getUserData_ById } from "../lib/auth.actions";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/app/hooks";
import { getData } from "@/app/lib/Redux/userdata";
import Image from "next/image";

type Inputs = {
  userName: string;
  email: string;
  password: string;
};

export default function Form({ type }: { type: "register" | "login" }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSuccess, setSuccess] = useState(false);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  // const onSubmit: SubmitHandler<Inputs> = async (data) => {
  //   try {
  //     if (type === "register") {
  //       const newUser = await AuthCreate({ user: { ...data } });

  //       if (newUser.status === 401) {
  //         alert("This Email Already Exists");
  //       }

  //       if (newUser.status === 200) {
  //         setSuccess(true);
  //         router.push("/");
  //       }
  //     }
  //     if (type === "login") {
  //       const newUser = await AuthLogin({
  //         user: { ...data },
  //         isVerifyed: true,
  //       });

  //       setError(newUser.message);

  //       if (newUser.status == 404) {
  //         alert(error);
  //       }
  //       if (newUser.status == 200) {
  //         const email = newUser?.CreateLogin.email;

  //         localStorage.setItem("email", email);
  //         const data = await getUserData_ById({ userId: email });
  //         localStorage.setItem("data", JSON.stringify(data));
  //         const local_Value = localStorage.getItem("data");
  //         if (local_Value) {
  //           const userData = JSON.parse(local_Value);
  //           if (userData) {
  //             dispatch(getData(userData));
  //             setSuccess(true);
  //             router.push(`/chats`);
  //           }
  //         }
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div className="auth">
      <div className="content">
        <Image
          width={100}
          height={100}
          src="/assets/logo.png"
          alt="logo"
          className="logo"
        />

        <form className="form">
          {type === "register" && (
            <div>
              <div className="input">
                <input
                  defaultValue=""
                  {...register("userName", {
                    required: "Username is required",
                    validate: (value) => {
                      if (value.length < 3) {
                        return "Username must be at least 3 characters";
                      }
                    },
                  })}
                  type="text"
                  placeholder="Username"
                  className="input-field"
                />
                <PersonOutline sx={{ color: "#737373" }} />
              </div>
              {errors.userName && (
                <p className="text-red-500">{errors.userName.message}</p>
              )}
            </div>
          )}

          <div>
            <div className="input">
              <input
                defaultValue=""
                {...register("email", { required: "Email is required" })}
                type="email"
                placeholder="Email"
                className="input-field"
              />
              <EmailOutlined sx={{ color: "#737373" }} />
            </div>
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <div className="input">
              <input
                defaultValue=""
                {...register("password", {
                  required: "Password is required",
                  validate: (value) => {
                    if (
                      value.length < 5 ||
                      !value.match(/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/)
                    ) {
                      return "Password must be at least 5 characters and contain at least one special character";
                    }
                  },
                })}
                type="password"
                placeholder="Password"
                className="input-field"
              />
              <LockOutlined sx={{ color: "#737373" }} />
            </div>
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
            {/* {error    && (
              <p className="text-red-500">{error}</p>
            )} */}
          </div>

          <button className="button" type="submit">
            {isSuccess
              ? type === "register"
                ? "Account Created"
                : "Login Successfully"
              : type === "register"
              ? "Join Free"
              : "Let's Chat"}
          </button>
        </form>

        {type === "register" ? (
          <Link href="/" className="link">
            Already have an account? Sign In Here
          </Link>
        ) : (
          <Link href="/register" className="link">
            Don&apos;t have an account? Register Here
          </Link>
        )}
      </div>
    </div>
  );
}
