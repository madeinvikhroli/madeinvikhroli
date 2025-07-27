"use client";
import React, { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useRouter } from "next/navigation";

const DashboardPages = ({ children }: any) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!user && !loading) {
      router.push("/");
    }
  }, [user, loading]);

  if (loading || !user) return null;
  return <div>{children}</div>;
};

export default DashboardPages;
