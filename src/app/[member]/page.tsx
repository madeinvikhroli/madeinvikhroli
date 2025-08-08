"use client";
import axios from "axios";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import mivPlaceholder from "../../../public/assets/common/placeholder.svg";
import ArtifactCard from "../ui/components/artifacts/ArtifactCard";
import { useQRCode } from "next-qrcode";
import { Share2 } from "lucide-react";

const Member = () => {
  const params = useParams();
  const memberSlug = params?.member;
  const [memberDetails, setMemberDetails] = useState<any>();
  const [memberOfferingsTypes, setOfferingsType] = useState<Array<string>>([]);
  const [artifacts, setArtifacts] = useState<any>();

  const { Image: QRImage } = useQRCode();
  const router = useRouter();

  const fetchMemberDetails = async () => {
    try {
      const res = await axios.post(`/api/members/getMemberByName`, {
        name: memberSlug,
      });
      if (!res?.data || Object.keys(res.data).length === 0) {
        router.push("/");
        return;
      }
      setMemberDetails(res?.data);
    } catch (error) {
      console.warn("No member found:", error);
    }
  };

  const fetchMemberArtifacts = async () => {
    try {
      const res = await axios.post(`/api/artifacts/getMemberArtifacts`, {
        id: memberDetails?.id,
      });
      setArtifacts(res?.data);
    } catch (error) {
      console.warn("No member found:", error);
    }
  };

  useEffect(() => {
    if (!memberSlug) return;
    fetchMemberDetails();
  }, [memberSlug]);

  useEffect(() => {
    if (!memberDetails) return;
    fetchMemberArtifacts();
  }, [memberDetails]);

  const getMemberOfferingsTypes = () => {
    const uniqueFileTypes = new Set<string>();

    artifacts?.forEach((artifact: any) => {
      try {
        const fileTypes: string[] = JSON.parse(artifact?.file_types);
        fileTypes.forEach((type: string) => uniqueFileTypes.add(type));
      } catch (err) {
        console.error("Invalid JSON in file_types:", artifact?.file_types);
      }
    });

    setOfferingsType(Array.from(uniqueFileTypes));
  };

  useEffect(() => {
    getMemberOfferingsTypes();
  }, [artifacts]);

  if (memberDetails) {
    return (
      <div className="min-h-screen flex flex-col gap-[24px]">
        <div className="w-full flex flex-row gap-4 md:gap-[24px]">
          <div className="relative min-w-[64px] md:min-w-[200px] h-fit aspect-square">
            <Image
              src={memberDetails?.profile_image || mivPlaceholder}
              fill={true}
              className="w-full object-contain aspect-square rounded-full"
              alt=""
            />
          </div>
          <div className="flex flex-col gap-2">
            <a
              href={`https://instagram.com/${memberDetails?.ig_username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[18px] md:text-[24px] font-medium line-clamp-1 cursor-pointer"
            >
              {memberDetails?.ig_username && "@"}
              {memberDetails?.ig_username}
            </a>
            <h2 className="text-[14px] md:text-[16px] text-[#4D4D4D] font-medium flex flex-row gap-2 mr-8 md:mr-16">
              offers:
              <span className="flex flex-row flex-wrap gap-1">
                {memberOfferingsTypes?.map((type: string, index: number) => (
                  <span
                    key={index}
                    className="border-[1px] border-[#4D4D4D] text-[#4D4D4D] rounded-[5px] px-1 text-[12px] select-none"
                  >
                    {type}
                  </span>
                ))}
              </span>
            </h2>
          </div>
          <div className="group w-[64px] md:w-[200px] relative ml-auto">
            <QRImage
              text={`upi://pay?pa=${memberDetails?.upi_id}&cu=INR`}
              options={{
                type: "image/jpeg",
                quality: 1,
                errorCorrectionLevel: "H",
                scale: 4,
                margin: 4,
                width: 200,
              }}
            />
            <button className="hidden md:block absolute top-[50%] left-[50%] translate-[-50%] text-nowrap h-fit bg-black text-white px-2 py-1 rounded-[5px] text-[12px] font-semibold">
              donate
            </button>
            <p className="hidden group-hover:block absolute -bottom-4 left-[50%] translate-x-[-50%] text-wrap text-[10px]">
              Share to UPI app to Donate
            </p>
          </div>
        </div>
        <div className="flex flex-row items-center gap-2 md:gap-4">
          <h2 className="text-[18px] md:text-[24px] font-medium">Artifacts</h2>
          <hr className="w-full bg-[#999999]" />
        </div>
        {artifacts ? (
          <div className="w-full grid md:grid-cols-3 gap-[20px]">
            {Array.isArray(artifacts) &&
              artifacts?.length > 0 &&
              artifacts?.map((artifact: any, index: number) => (
                <ArtifactCard artifact={artifact} key={index} />
              ))}
          </div>
        ) : (
          <div className="w-full h-full text-[24px] flex flex-col items-center justify-center text-center text-[#999999] font-medium">
            No Artifacts Found
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className="fixed top-0 left-0 w-screen h-screen bg-white z-50"></div>
    );
  }
};

export default Member;
