"use client";
import axios from "axios";
import { client } from "../api/client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import visible from "../../../public/assets/login/visible.svg";
import hidden from "../../../public/assets/login/hidden.svg";
import Link from "next/link";
type member = {
  email: string;
  password: string;
  upi_id: string;
  ig_username: string;
  profile_image: string;
};
const BecomeMember = () => {
  const router = useRouter();
  const [memberDetails, setMemberDetails] = useState<member>({
    email: "",
    password: "",
    upi_id: "",
    ig_username: "",
    profile_image: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const allowedEmails =
    process.env.NEXT_PUBLIC_ALLOWED_EMAILS?.split(",") || [];

  const handleMemberDetailsUpdate = (key: string, value: string) => {
    setMemberDetails((prev: member) => ({
      ...prev,
      [key]: value,
    }));
  };
  const createMember = async (e: any) => {
    e.preventDefault();
    if (!allowedEmails.includes(memberDetails.email)) {
      setError(
        "Whoa there! Only approved sellers can enter this marketplace 🛍️✨"
      );
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }
    const { email, password, ...rest } = memberDetails;
    const { data, error } = await client.auth.signUp({
      email: email,
      password: password,
    });
    if (data?.user?.id) {
      try {
        const res = await axios.post("/api/members/create", {
          ...rest,
          email,
          user_id: data?.user?.id,
        });
        if (res?.status === 200) {
          router.push("/dashboard");
        } else {
          console.warn("member creation failed");
          setError("Could not register you as member");
          setTimeout(() => {
            setError("");
          }, 3000);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error("member creation failed");
      setError(error?.message || "Something went wrong");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  return (
    <div className="min-h-[calc(100vh-107px)] flex flex-col items-center justify-center text-[14px]">
      <p className="place-self-top mt-16 mb-auto text-[100px] text-nowrap font-semibold">
        Become a Member
      </p>
      <form
        onSubmit={createMember}
        className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col gap-4 bg-white p-4 rounded-[10px] drop-shadow-[0_0_2px_rgba(0,0,0,0.25)]"
      >
        <div className="flex flex-row gap-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-medium">
              Email
            </label>
            <input
              className="bg-[#F2F2F2] p-2 placeholder:text-[#808080] rounded-[5px]"
              id="email"
              name="email"
              type="email"
              placeholder="aakash@gmail.com"
              value={memberDetails.email}
              onChange={(e) =>
                handleMemberDetailsUpdate("email", e.target.value)
              }
              required
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
                required
                minLength={6}
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
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="upi_id" className="font-medium">
            UPI ID
          </label>
          <input
            className="bg-[#F2F2F2] p-2 placeholder:text-[#808080] rounded-[5px]"
            id="upi_id"
            name="upi_id"
            type="text"
            placeholder="aakash@bank"
            value={memberDetails.upi_id}
            onChange={(e) =>
              handleMemberDetailsUpdate("upi_id", e.target.value)
            }
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="ig_username" className="font-medium">
            IG Username
          </label>
          <input
            className="bg-[#F2F2F2] p-2 placeholder:text-[#808080] rounded-[5px]"
            id="ig_username"
            name="ig_username"
            type="text"
            placeholder="aakash_123"
            value={memberDetails.ig_username}
            onChange={(e) =>
              handleMemberDetailsUpdate("ig_username", e.target.value)
            }
            required
          />
        </div>
        <p className="text-[12px] text-[#808080]">
          By clicking join you agree to our{" "}
          <Link href="/policy" className="underline">
            policies
          </Link>
        </p>
        {error && <p className="text-red-700">{error}</p>}
        <button
          type="submit"
          className="bg-black text-white p-2 font-semibold rounded-[5px] mt-2"
        >
          Join
        </button>
      </form>
    </div>
  );
};

export default BecomeMember;
