"use client";
import { client } from "@/app/api/client";
import useAuth from "@/app/hooks/useAuth";
import Image from "next/image";
import mivPlaceholder from "../../../../public/assets/common/placeholder.svg";
import { useEffect, useState } from "react";
import axios from "axios";
import CreateArtifactForm from "@/app/ui/components/artifacts/CreateArtifactForm";
import ArtifactCard from "@/app/ui/components/artifacts/ArtifactCard";

interface User {
  upi_id: string;
  email: string;
  ig_username: string;
  profile_image: File | string;
}

interface Artifact {
  name: string;
  description: string;
  price: number | null;
  image: File | string;
  by_member: string;
  url: string;
  file_types: string[];
}

const Dashboard = () => {
  const [userDetailsEditable, setUserDetailsEditable] = useState(false);
  const [modifiedUserDetails, setModifiedUserDetails] = useState<User>({
    upi_id: "",
    email: "",
    ig_username: "",
    profile_image: "",
  });
  const [newArtifactDetails, setNewArtifactDetails] = useState<Artifact>({
    name: "",
    description: "",
    price: null,
    image: "",
    by_member: "",
    url: "",
    file_types: [],
  });
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [showCreateArtifactForm, setShowCreateArtifactForm] = useState(false);
  const [artifactImageFile, setArtifactImageFile] = useState<File | null>(null);
  const [artifactCreated, setArtifactCreated] = useState(false);
  const [artifacts, setArtifacts] = useState<any>([]);
  const { userDetails } = useAuth();

  const handleModifiedUserDetailsChange = (key: string, value: string) => {
    setModifiedUserDetails((prev: User) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleNewArtifactDetailsChange = (key: string, value: string) => {
    setNewArtifactDetails((prev: Artifact) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleProfileImageChange = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setModifiedUserDetails((prev: User) => ({
        ...prev,
        profile_image: reader.result as string,
      }));
    };
    reader.readAsDataURL(file);
    setProfileImageFile(file);
    setUserDetailsEditable(true);
  };
  const fetchMemberArtifacts = async () => {
    try {
      const res = await axios.post("/api/artifacts/getMemberArtifacts", {
        id: userDetails?.id,
      });
      setArtifacts(res?.data);
      console.log(res?.data);
    } catch (error) {}
  };

  useEffect(() => {
    if (!userDetails) return;
    fetchMemberArtifacts();
    setModifiedUserDetails(userDetails);
  }, [userDetails]);

  const handleMemberDetailsUpdate = async (e: any) => {
    e.preventDefault();
    try {
      const form = new FormData(e.target);
      form.append("user_id", userDetails?.user_id);
      profileImageFile && form.append("profile_image", profileImageFile);
      form.append("email", modifiedUserDetails?.email);
      form.append("upi_id", modifiedUserDetails?.upi_id);
      form.append("ig_username", modifiedUserDetails?.ig_username);
      console.log(form);
      const res = await axios.post("/api/members/update", form);
      console.log(res);
      if (res?.status === 200) {
        setArtifactCreated(true);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const createNewArtifact = async (e: any) => {
    e.preventDefault();
    if (newArtifactDetails.file_types.length === 0 || !newArtifactDetails.image)
      return;
    try {
      const form = new FormData(e.target);
      form.append("by_member", userDetails?.id);
      artifactImageFile && form.append("image", artifactImageFile);
      form.append("name", newArtifactDetails?.name);
      form.append("description", newArtifactDetails?.description);
      form.append("price", newArtifactDetails?.price?.toString() || "");
      newArtifactDetails?.file_types.includes("url") &&
        form.append("url", newArtifactDetails?.url);
      form.append("file_types", JSON.stringify(newArtifactDetails?.file_types));
      console.log(form);
      const res = await axios.post("/api/artifacts/create", form);
      console.log(res);
      if (res?.status === 200) {
        setArtifactCreated(true);
        setTimeout(() => {
          setShowCreateArtifactForm(false);
        }, 3000);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col gap-8">
      <form
        onSubmit={handleMemberDetailsUpdate}
        className="w-full flex flex-row gap-[24px]"
      >
        <div className="relative w-[200px] aspect-square">
          <Image
            src={modifiedUserDetails?.profile_image || mivPlaceholder}
            fill={true}
            className="max-w-[200px] object-contain aspect-square rounded-full"
            alt=""
          />
          <button
            onClick={() => document.getElementById("profile_image")?.click()}
            className="absolute bottom-4 left-[50%] translate-x-[-50%] text-nowrap h-fit bg-black text-white px-2 py-1 rounded-[5px] text-[12px] font-semibold"
          >
            Update Image
          </button>
        </div>
        <input
          onChange={handleProfileImageChange}
          id="profile_image"
          type="file"
          className="hidden"
        />
        <div className="flex flex-col gap-2 font-medium">
          <label
            className={`${
              userDetailsEditable ? "text-[14px]" : "text-[24px]"
            } line-clamp-1 flex flex-col gap-2`}
          >
            {userDetailsEditable && "IG Username"}
            <input
              type="text"
              className={`${
                userDetailsEditable
                  ? "border-[1px] border-[#4D4D4D] rounded-[5px] px-2 py-1 font-normal"
                  : "border-none p-0"
              } `}
              value={`${modifiedUserDetails?.ig_username}`}
              onChange={(e) =>
                handleModifiedUserDetailsChange("ig_username", e.target.value)
              }
              contentEditable={userDetailsEditable}
            />
          </label>
          <label
            className={`${
              userDetailsEditable
                ? "text-[14px]"
                : "text-[#4D4D4D] text-[16px] "
            } line-clamp-1 flex flex-col gap-2`}
          >
            {userDetailsEditable && "Email"}
            <input
              type="text"
              className={`${
                userDetailsEditable
                  ? "border-[1px] border-[#4D4D4D] rounded-[5px] px-2 py-1 font-normal"
                  : "border-none p-0"
              } `}
              value={`${modifiedUserDetails?.email}`}
              onChange={(e) =>
                handleModifiedUserDetailsChange("email", e.target.value)
              }
              contentEditable={userDetailsEditable}
            />
          </label>
          <label
            className={`${
              userDetailsEditable ? "text-[14px]" : "text-[#999999] text-[14px]"
            } line-clamp-1 flex flex-col gap-2`}
          >
            {userDetailsEditable && "UPI ID"}
            <input
              type="text"
              className={`${
                userDetailsEditable
                  ? "border-[1px] border-[#4D4D4D] rounded-[5px] px-2 py-1 font-normal"
                  : "border-none p-0"
              } `}
              value={`${modifiedUserDetails?.upi_id}`}
              onChange={(e) =>
                handleModifiedUserDetailsChange("upi_id", e.target.value)
              }
              contentEditable={userDetailsEditable}
            />
          </label>
        </div>

        {userDetailsEditable ? (
          <button
            type="submit"
            key="save"
            className="h-fit bg-black text-white px-4 py-1 rounded-[5px] text-[14px] font-semibold ml-auto"
          >
            Save
          </button>
        ) : (
          <button
            type="button"
            key="edit"
            onClick={() => setUserDetailsEditable(true)}
            className="h-fit bg-black text-white px-4 py-1 rounded-[5px] text-[14px] font-semibold ml-auto"
          >
            Edit
          </button>
        )}
      </form>
      <div className="flex flex-row items-center gap-4">
        <h2 className="text-[24px] font-medium">Artifacts</h2>
        <hr className="w-full bg-[#999999]" />
        <button
          type="button"
          onClick={() => setShowCreateArtifactForm(true)}
          className="bg-black text-white px-4 py-1 rounded-[5px] text-[14px] font-semibold"
        >
          Upload
        </button>
      </div>
      {showCreateArtifactForm && (
        <CreateArtifactForm
          setShowCreateArtifactForm={setShowCreateArtifactForm}
          newArtifactDetails={newArtifactDetails}
          handleNewArtifactDetailsChange={handleNewArtifactDetailsChange}
          artifactImageFile={artifactImageFile}
          setArtifactImageFile={setArtifactImageFile}
          artifactCreated={artifactCreated}
          createNewArtifact={createNewArtifact}
        />
      )}
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
};

export default Dashboard;
