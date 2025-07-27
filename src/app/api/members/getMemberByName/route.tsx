import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name } = await request.json();

    if (!name) {
      console.error("Missing required fields");
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const res = await prisma.members.findUnique({
      where: {
        ig_username: name,
      },
    });

    console.log(res);
    return NextResponse.json(res);
  } catch (error) {
    console.error("No member found:", error);
    return NextResponse.json({ error: "No member found" }, { status: 500 });
  }
}
