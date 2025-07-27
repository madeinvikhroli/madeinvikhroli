import Image from "next/image";
import React from "react";
import { useQRCode } from "next-qrcode";

interface member {
  id: string;
  upi_id: string;
  email: string;
  ig_username: string;
  profile_image: string;
}

const MembersCard = ({ member }: { member: member }) => {
  const { Image: QRImage } = useQRCode();

  return (
    <div className="relative h-[550px] flex flex-col rounded-[25px] overflow-clip text-white">
      <div className="w-full blur-xl scale-110 h-full bg-gradient-to-b from-[#FF0000] via-[#FFE040] to-blue-950" />
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] aspect-square overflow-hidden w-[200px] mx-auto">
        {member?.profile_image && (
          <Image
            src={member?.profile_image}
            fill={true}
            className="w-full object-contain aspect-square rounded-full"
            alt=""
          />
        )}
      </div>
      <div className="absolute left-[30px] bottom-[30px] w-[calc(100%-60px)] flex flex-row justify-between items-baseline">
        <a
          href={`https://instagram.com/${member?.ig_username}`}
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
