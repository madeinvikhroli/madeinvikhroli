import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import cachedArtifacts from "@/db/artifacts.json";

function deepEqual(obj1: any, obj2: any): boolean {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

export async function GET() {
  try {
    const artifacts = await prisma.artifacts.findMany({
      include: { from_member: true },
    });
    const isSame = deepEqual(artifacts, cachedArtifacts);
    if (!isSame) {
      const filePath = path.resolve(process.cwd(), "src/db/artifacts.json");
      await fs.writeFile(filePath, JSON.stringify(artifacts, null, 2));
      console.log("✅ artifacts.json updated.");
    } else {
      console.log("✅ artifacts.json unchanged.");
    }

    return NextResponse.json({ artifacts });
  } catch (error) {
    console.error("Error fetching artifacts:", error);
    return NextResponse.json(
      { error: "Failed to fetch artifacts" },
      { status: 500 }
    );
  }
}
