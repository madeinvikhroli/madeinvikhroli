import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

function deepEqual(a: any, b: any): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}

export async function GET() {
  try {
    const members = await prisma.members.findMany({});
    return NextResponse.json({ members });
  } catch (error) {
    console.error("Error fetching members:", error);
    return NextResponse.json(
      { error: "Failed to fetch members" },
      { status: 500 }
    );
  }
}
