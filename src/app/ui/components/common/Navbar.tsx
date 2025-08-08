"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import mivNavLogo from "../../../../../public/assets/navbar/miv-nav-logo.svg";
import discord from "../../../../../public/assets/navbar/discord.svg";
import Image from "next/image";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ChevronLeft, ChevronRight } from "lucide-react";
const Navbar = () => {
  const pathname = usePathname();
  const [selectedTab, setSelectedTab] = useState<string>();
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  useEffect(() => {
    if (pathname.includes("artifacts")) {
      setSelectedTab("Artifacts");
    } else if (pathname.includes("members")) {
      setSelectedTab("Members");
    } else if (pathname.includes("about-us")) {
      setSelectedTab("About Us");
    }
  }, [pathname]);

  return (
    <div className="w-full md:relative flex flex-row gap-4 items-center justify-between p-4 md:mt-[30px] text-[14px]">
      <h1 className="fixed top-0 left-0 opacity-0 select-none pointer-events-none">
        A Collective of Artists & Tech Innovators – Sharing Creative Projects &
        Ideas
      </h1>
      <h2 className="fixed top-0 left-0 opacity-0 select-none pointer-events-none">
        Based in Vikhroli, India, this community shares innovative art and tech
        projects.
      </h2>

      <Link href={"/artifacts"}>
        <Image src={mivNavLogo} alt="miv-logo" />
      </Link>
      <div
        onClick={() => setSidebarOpen(false)}
        className={`
    ${sidebarOpen ? "flex" : "hidden"}
    md:flex
    absolute top-0 left-0 w-screen h-screen z-50
    md:w-fit md:h-fit md:top-[50%] md:left-[50%] md:translate-[-50%]
    bg-black text-white select-none
    flex-col md:flex-row gap-[24px] md:items-center
    p-4 md:pt-3 md:px-4 md:rounded-[10px]
    font-semibold
  `}
      >
        <div
          className="font-semibold min-h-[68px] md:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <ChevronRight />
        </div>
        <Link
          href="/artifacts"
          onClick={() => setSelectedTab("Artifacts")}
          className={`flex flex-col justify-between cursor-pointer ${
            selectedTab === "Artifacts" ? "text-[#E26365]" : ""
          }`}
        >
          Artifacts
        </Link>
        <Link
          href="/about-us"
          onClick={() => setSelectedTab("About Us")}
          className={`flex flex-col justify-between cursor-pointer ${
            selectedTab === "About Us" ? "text-[#E26365]" : ""
          }`}
        >
          About Us
        </Link>
        <Link
          href="/members"
          onClick={() => setSelectedTab("Members")}
          className={`flex flex-col justify-between cursor-pointer ${
            selectedTab === "Members" ? "text-[#E26365]" : ""
          }`}
        >
          Members
        </Link>
      </div>

      <div className="flex flex-row items gap-4">
        <LanguageSwitcher />
      </div>
      <div
        className="font-semibold select-none md:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <ChevronLeft />
      </div>
    </div>
  );
};

export default Navbar;
