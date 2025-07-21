import Image from "next/image";
import Link from "next/link";
import React from "react";
import mivNavLogo from "../../../../../public/assets/navbar/miv-nav-logo.svg";

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
  return (
    <div className="w-screen md:min-h-fit bg-black text-white flex flex-col gap-[24px]">
      <div className="w-full md:w-[1240px] md:mx-auto p-4 md:p-[24px]">
        <div className="flex flex-col md:flex-row md:flex-nowrap gap-[24px]">
          <div className="md:w-[calc(50%-12px)] flex flex-col gap-[24px]">
            <Link href={"/policy"} className="font-medium text-[64px]">
              MIVs Policy
            </Link>
            <div className=" flex flex-col md:flex-row md:flex-nowrap gap-[24px]">
              {routesArray.map((route, index) => (
                <Link
                  key={index}
                  href={route.href}
                  className=" text-[#808080] font-medium text-[24px] hover:text-white"
                >
                  {route.name}
                </Link>
              ))}
            </div>
            <a
              href="https://instagram.com/madeinvikhroli"
              target="_blank"
              className="w-[calc(50%-12px)] font-normal text-[#808080] hover:text-white text-[16px]"
            >
              ig/@madeinvikhroli
            </a>
          </div>
          <div className="relative order-[-1] md:order-1 w-full aspect-[4.6/1] md:min-w-[calc(50%-12px)] md:h-auto md:w-[400px]">
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
