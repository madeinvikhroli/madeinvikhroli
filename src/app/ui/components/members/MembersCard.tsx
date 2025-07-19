import Image from "next/image";
import React from "react";

interface member {
  id: string;
  upi_id: string;
  email_id: string;
  ig_username: string;
  profile_image: string
}


const MembersCard = ({ member }: { member: member}) => {
  
  return (
    <div className="flex flex-col max-w-[310]">
      <div className="aspect-square overflow-hidden relative w-full">
          <Image src={member?.profile_image} fill={true} className="w-full object-contain aspect-square" alt=""/>
      </div>
      <div className="flex flex-col gap-2 items-start p-2">
            <h1 className="line-clamp-1 text-nowrap text-[16px] font-medium">@{member?.ig_username}</h1>
            <a
              href={`https://instagram.com/${member?.ig_username}`}
              target="_blank"
              className="p-2 w-full h-fit rounded-[8px] py-2 border-[1px] text-center border-black hover:bg-black hover:text-white cursor-pointer active:scale-99 font-medium text-[14px]"
            >
              <h1 className="">Visit IG Profile</h1>
            </a>
          </div>
    </div>
  );
};

export default MembersCard;
