"use client";

import { useEffect, useState } from "react";
import ArtifactCard from "../ui/components/artifacts/ArtifactCard";
import axios from "axios";
import { usePathname } from "next/navigation";

interface artifact {
  id: string;
  image: string;
  name: string;
  description: string;
  price: string;
  created_at: string;
  from_member: {
    id: string;
    upi_id: string;
    email_id: string;
    ig_username: string;
  };
}

export default function Page() {
  const pathname = usePathname();
  const [artifacts, setArtifacts] = useState<artifact[]>([]);

  useEffect(() => {
    const fetchArtifacts = async () => {
      try {
        const res = await axios.get("/api/artifacts");
        setArtifacts(res?.data?.artifacts);
      } catch (error) {
        console.error("Error fetching artifacts:", error);
      }
    };
    fetchArtifacts();
  }, [pathname]);

  return (
    <div
      className={`w-full min-h-screen grid grid-cols-1 sm:grid-cols-${
        artifacts?.length <= 4 && artifacts?.length !== 1
          ? artifacts?.length
          : 4
      } gap-[1px]`}
    >
      {Array.isArray(artifacts) &&
        artifacts?.length > 0 &&
        artifacts?.map((artifact, index) => (
          <ArtifactCard artifact={artifact} key={index} />
        ))}
    </div>
  );
}
