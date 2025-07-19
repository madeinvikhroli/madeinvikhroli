"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import mivNavLogo from '../../../../../public/assets/navbar/miv-nav-logo.svg';
import discord from '../../../../../public/assets/navbar/discord.svg';
import Image from "next/image";
const Navbar = () => {
  const pathname = usePathname();
  const [selectedTab, setSelectedTab] = useState<string>();
  useEffect(() => {
    if (pathname.includes('artifacts')) {
      setSelectedTab('Artifacts');
    } else if (pathname.includes('members')) {
      setSelectedTab('Members');
    } else if (pathname.includes('about-us')) {
      setSelectedTab('About Us');
    }
  }, [pathname]);
  return (
    <div className="w-full flex flex-row gap-4 items-center justify-between mt-[30px] text-[14px]">
      <Link href={'/artifacts'}><Image src={mivNavLogo}  alt="miv-logo"/></Link>
      <div className="bg-black text-white flex flex-row gap-[24px] items-center px-4 py-[12px] rounded-[10px] font-semibold">
        <Link href='/artifacts' onClick={()=>setSelectedTab('Artifacts')} className={`flex flex-col justify-between cursor-pointer ${selectedTab === "Artifacts" && "text-[#E26365]"}`}>
          Artifacts
        </Link>
        <Link href='/about-us' onClick={()=>setSelectedTab('About Us')} className={`flex flex-col justify-between cursor-pointer ${selectedTab === "About Us" && "text-[#E26365]"}`}>
          About Us
        </Link>
        <Link href='/members' onClick={()=>setSelectedTab('Members')} className={`flex flex-col justify-between cursor-pointer ${selectedTab === "Members" && "text-[#E26365]"}`}>
          Members
        </Link>
      </div>
      <a
        href="https://discord.gg/eKvZxeQRND"
        target="_blank"
        className="border-[#5865F2] text-[#5865F2] border-[2px] px-[12px] py-[6px] rounded-[50px] hidden lg:flex flex-row gap-2 items-center font-semibold" 
      >
        Join Discord
        <Image src={discord} width={20} height={16} alt="discord"/>
      </a>
    </div>
  );
};

export default Navbar;
