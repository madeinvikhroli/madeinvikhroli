import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import { supabaseServiceRole } from "../../supabase-service-role";

export async function POST(resquest: Request) {
  try {
    const formData = await resquest.formData();
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = formData.get("price") as string;
    const imageFile = formData.get("image") as File | null;
    const by_member = formData.get("by_member") as string;
    const file_types = formData
      .getAll("file_types")
      .filter((value): value is string => typeof value === "string");

    let url: string | null = null;
    if (file_types.includes("url")) {
      url = formData.get("url") as string;
    }

    if (!name || !imageFile || !price || !by_member || !file_types) {
      console.error("Missing required fields");
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    let imageUrl = "";

    if (imageFile) {
      const fileName = `artifact-images/${name
        .toLocaleLowerCase()
        .replace(/\s/g, "")}-${Date.now()}.png`;
      const { error: uploadError } = await supabaseServiceRole.storage
        .from("madeinvikhroli-storage")
        .upload(fileName, imageFile, {
          cacheControl: "3600",
          upsert: true,
        });
      if (uploadError) {
        console.error("Error uploading profile image:", uploadError);
        return NextResponse.json(
          { error: "Failed to upload profile image" },
          { status: 500 }
        );
      }
      const {
        data: { publicUrl },
      } = supabaseServiceRole.storage
        .from("madeinvikhroli-storage")
        .getPublicUrl(fileName);

      imageUrl = publicUrl;
    }

    const res = await prisma.artifacts.create({
      data: {
        name,
        description,
        price,
        image: imageUrl,
        by_member,
        file_types,
        url,
      },
    });
    return NextResponse.json(
      JSON.parse(
        JSON.stringify(res, (_, v) =>
          typeof v === "bigint" ? v.toString() : v
        )
      )
    );
  } catch (error) {
    console.error("Error while creating artifacts:", error);
    return NextResponse.json(
      { error: "Failed to create artifacts" },
      { status: 500 }
    );
  }
}
