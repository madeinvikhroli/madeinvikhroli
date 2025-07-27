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

    const res = await prisma.artifacts.findMany({
      where: {
        by_member: id,
      },
      include: { members: true },
    });

    const formattedArtifacts = res.map((artifact) => {
      const {
        members: { id, ig_username, email, upi_id, profile_image },
        ...rest
      } = artifact;

      return {
        ...rest,
        by_member: {
          id,
          ig_username,
          email,
          upi_id,
          profile_image,
        },
      };
    });

    return NextResponse.json(
      JSON.parse(
        JSON.stringify(formattedArtifacts, (_, v) =>
          typeof v === "bigint" ? v.toString() : v
        )
      )
    );
  } catch (error) {
    console.error("No artifacts found:", error);
    return NextResponse.json({ error: "No artifacts found" }, { status: 500 });
  }
}
