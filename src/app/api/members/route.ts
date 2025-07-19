import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import cachedMembers from "@/db/members.json";

function deepEqual(a: any, b: any): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}

export async function GET() {
  try {
    const members = await prisma.members.findMany({});
    const isSame = deepEqual(members, cachedMembers);

    if (!isSame) {
      const filePath = path.resolve(process.cwd(), "src/db/members.json");
      await fs.writeFile(filePath, JSON.stringify(members, null, 2));
      console.log("✅ members.json updated with new data.");
    } else {
      console.log("✅ members.json unchanged — no update needed.");
    }
    return NextResponse.json({ members });
  } catch (error) {
    console.error("Error fetching members:", error);
    return NextResponse.json(
      { error: "Failed to fetch members" },
      { status: 500 }
    );
  }
}
