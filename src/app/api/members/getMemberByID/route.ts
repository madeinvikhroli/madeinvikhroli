import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      console.error("Missing required fields");
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const res = await prisma.members.findFirst({
      where: {
        user_id: id,
      },
    });
    return NextResponse.json(res);
  } catch (error) {
    console.error("No member found:", error);
    return NextResponse.json({ error: "No member found" }, { status: 500 });
  }
}
