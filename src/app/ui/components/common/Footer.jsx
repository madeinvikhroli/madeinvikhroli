"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import mivNavLogo from "../../../../../public/assets/navbar/miv-nav-logo.svg";
import useAuth from "@/app/hooks/useAuth";
import { client } from "@/app/api/client";
import discord from "../../../../../public/assets/navbar/discord.svg";
import { Instagram } from "lucide-react";

const routesArray = [
  {
    name: "Artifacts",
    href: "/artifacts",
  },
  {
    name: "About Us",
    href: "/about-us",
  },
  {
    name: "Members",
    href: "/members",
  },
];

const Footer = () => {
  const [memberName, setMemberName] = useState("");
  const { user, userDetails } = useAuth();

  return (
    <div className="w-screen md:min-h-fit bg-black text-white flex flex-col gap-[24px]">
      <div className="w-full md:w-[1240px] md:mx-auto p-4 py-8 md:p-[24px]">
        <div className="flex flex-col md:flex-row md:flex-nowrap gap-[24px]">
          <div className="md:w-[calc(50%-12px)] flex flex-col gap-[24px]">
            <Link
              href={"/policy"}
              className="font-medium text-[42px] md:text-[64px] cursor-pointer"
            >
              MIVs Policy
            </Link>
            <div className="flex flex-col md:flex-row md:flex-nowrap gap-[24px]">
              {routesArray.map((route, index) => (
                <Link
                  key={index}
                  href={route.href}
                  className=" text-[#808080] font-medium text-[18px] md:text-[24px] hover:text-white cursor-pointer"
                >
                  {route.name}
                </Link>
              ))}
            </div>
            <div className="flex flex-row gap-4 text-[18px] font-medium text-[#808080]">
              {user ? (
                <div className="flex flex-row gap-4">
                  <Link href="/dashboard" className="cursor-pointer">
                    Dashboard
                  </Link>
                  <button
                    onClick={() => client.auth.signOut()}
                    className="cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link href="/login">Login</Link>
              )}
            </div>
            <div className="flex flex-row flex-wrap gap-4 items-center">
              <a
                href="https://instagram.com/madeinvikhroli"
                target="_blank"
                className="w-fit font-normal text-[#808080] hover:text-white text-[16px] cursor-pointer"
              >
                <Instagram />
              </a>
              <a
                href="https://discord.gg/eKvZxeQRND"
                target="_blank"
                className="border-[#5865F2] text-[#5865F2] border-[2px] px-[12px] py-[6px] rounded-[50px] w-fit flex flex-row gap-2 items-center font-semibold"
              >
                Join Discord
                <Image src={discord} width={20} height={16} alt="discord" />
              </a>
            </div>
          </div>
          <div className="relative order-[-1] md:order-1 w-full aspect-[4.6/1] md:min-w-[calc(50%-12px)] md:h-auto md:w-[400px] cursor-pointer">
            <Link href={"/artifacts"}>
              <Image
                src={mivNavLogo}
                fill={true}
                className="md:w-full invert object-contain"
                alt="miv-logo"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
