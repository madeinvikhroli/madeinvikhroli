import Image from "next/image";
import React from "react";
import { useQRCode } from "next-qrcode";
import { useRouter } from "next/navigation";
import memberCardBg from "../../../../../public/assets/members/member-card-bg.png";

interface member {
  id: string;
  upi_id: string;
  email: string;
  ig_username: string;
  profile_image: string;
}

const MembersCard = ({ member }: { member: member }) => {
  const { Image: QRImage } = useQRCode();
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/${member?.ig_username}`)}
      className="relative h-[550px] flex flex-col rounded-[50px] overflow-clip text-white cursor-pointer"
    >
      <div className="w-full h-full" />
      <Image
        src={memberCardBg}
        fill={true}
        className="w-full object-cover"
        alt="member card background"
      />
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] aspect-square overflow-hidden w-[200px] mx-auto">
        {member?.profile_image && (
          <Image
            src={member?.profile_image}
            fill={true}
            className="w-full object-contain aspect-square rounded-full"
            alt={`${member?.ig_username}'s profile image`}
            placeholder="blur"
            blurDataURL={member?.profile_image}
          />
        )}
      </div>
      <div className="absolute left-[30px] bottom-[30px] w-[calc(100%-60px)] flex flex-row justify-between items-baseline">
        <a
          href={`https://instagram.com/${member?.ig_username}`}
          onClick={(e) => e.stopPropagation()}
          target="_blank"
          className="line-clamp-1 text-nowrap text-[16px] font-medium"
        >
          @{member?.ig_username}
        </a>
        <QRImage
          text={`upi://pay?pa=${member?.upi_id}&cu=INR`}
          options={{
            type: "image/jpeg",
            quality: 1,
            errorCorrectionLevel: "H",
            scale: 4,
            margin: 4,
            width: 80,
          }}
        />
      </div>
    </div>
  );
};

export default MembersCard;
