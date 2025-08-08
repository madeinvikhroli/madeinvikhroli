"use client";
import axios from "axios";
import { client } from "../api/client";
import React, { useState } from "react";
import visible from "../../../public/assets/login/visible.svg";
import hidden from "../../../public/assets/login/hidden.svg";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

type member = {
  email: string;
  password: string;
};

const Login = () => {
  const [memberDetails, setMemberDetails] = useState<member>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleMemberDetailsUpdate = (key: string, value: string) => {
    setMemberDetails((prev: member) => ({
      ...prev,
      [key]: value,
    }));
  };
  const login = async (e: any) => {
    e.preventDefault();
    const { data, error } = await client.auth.signInWithPassword({
      email: memberDetails.email,
      password: memberDetails.password,
    });
    if (data?.user?.id) {
      router.push("/dashboard");
    }
    if (error) {
      setError(error?.message);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  return (
    <div className="min-h-[calc(100vh-107px)] relative flex flex-col items-center justify-center text-[14px]">
      <p className="place-self-top mt-16 mb-auto text-[42px] md:text-[100px] text-nowrap font-semibold">
        Login
      </p>
      <form
        onSubmit={login}
        className="absolute top-[50%] left-[50%] translate-[-50%] min-w-[calc(100%-32px)] md:min-w-[400px] flex flex-col gap-4 bg-white p-4 rounded-[10px] drop-shadow-[0_0_2px_rgba(0,0,0,0.25)]"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="font-medium">
            Email
          </label>
          <input
            className="bg-[#F2F2F2] p-2 placeholder:text-[#808080] rounded-[5px] focus:outline-none focus:ring-2 focus:ring-black"
            id="email"
            name="email"
            type="email"
            placeholder="aakash@gmail.com"
            value={memberDetails.email}
            onChange={(e) => handleMemberDetailsUpdate("email", e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="font-medium">
            Password
          </label>
          <div className="w-full relative">
            <input
              className="bg-[#F2F2F2] w-full p-2 placeholder:text-[#808080] rounded-[5px] focus:outline-none focus:ring-2 focus:ring-black"
              id="password"
              name="email"
              type={showPassword ? "text" : "password"}
              placeholder="**********"
              value={memberDetails.password}
              onChange={(e) =>
                handleMemberDetailsUpdate("password", e.target.value)
              }
            />
            <div
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute p-1 bg-[#F2F2F2] right-2 top-[50%] translate-y-[-50%] cursor-pointer"
            >
              {showPassword ? (
                <Image
                  src={visible}
                  width={16}
                  height={13}
                  alt="Hide password"
                  className="object-contain"
                />
              ) : (
                <Image
                  src={hidden}
                  width={16}
                  height={13}
                  alt="Show password"
                  className="object-contain"
                />
              )}
            </div>
          </div>
        </div>
        {error && <p className="text-red-700">{error}</p>}
        <button
          type="submit"
          className="bg-black text-white p-2 font-semibold rounded-[5px] mt-2"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
