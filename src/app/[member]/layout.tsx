import { prisma } from "@/app/lib/prisma";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  children: React.ReactNode;
  params: {
    member: string;
  };
};

export default async function MemberLayout({ children, params }: Props) {
  const { member } = params;

  const existingMember = await prisma.members.findUnique({
    where: {
      ig_username: member,
    },
  });

  if (!existingMember) {
    redirect("/");
  }

  return <>{children}</>;
}
