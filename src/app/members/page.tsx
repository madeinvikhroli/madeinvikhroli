"use client";

import React, { useEffect, useState } from "react";
import MembersCard from "../ui/components/members/MembersCard";
import axios from "axios";
import cachedMembers from "@/db/members.json";

interface member {
  id: string;
  upi_id: string;
  email_id: string;
  ig_username: string;
  profile_image: string;
}

const page = () => {
  const [members, setMembers] = useState<member[]>();

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await axios.get("/api/members");
        setMembers(res.data.members);
      } catch (error) {
        console.error("Error fetching members:", error);
        setMembers(cachedMembers);
      }
    };
    fetchMembers();
  }, []);

  return (
    <div className="min-h-screen grid grid-cols-1 sm:grid-cols-4 gap-[1px]">
      {Array.isArray(members) &&
        members?.length > 0 &&
        members?.map((member, index) => (
          <MembersCard member={member} key={index} />
        ))}
    </div>
  );
};

export default page;
