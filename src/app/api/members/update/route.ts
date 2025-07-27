import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import { supabaseServiceRole } from "../../supabase-service-role";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const email = formData.get("email") as string;
    const upi_id = formData.get("upi_id") as string;
    const ig_username = formData.get("ig_username") as string;
    const profileImageFile = formData.get("profile_image") as File | null;
    const user_id = formData.get("user_id") as string;

    if (!email || !upi_id || !ig_username || !user_id) {
      console.error("Missing required fields");
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    let imageUrl = "";

    if (profileImageFile) {
      const fileName = `profile-images/${ig_username
        .toLocaleLowerCase()
        .replace(/\s/g, "")}-${Date.now()}.png`;
      const { error: uploadError } = await supabaseServiceRole.storage
        .from("madeinvikhroli-storage")
        .upload(fileName, profileImageFile, {
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

    let res;
    if (imageUrl) {
      res = await prisma.members.update({
        where: {
          user_id,
        },
        data: {
          email,
          upi_id,
          ig_username,
          profile_image: imageUrl,
          user_id,
        },
      });
    } else {
      res = await prisma.members.update({
        where: {
          user_id,
        },
        data: {
          email,
          upi_id,
          ig_username,
          user_id,
        },
      });
    }
    return NextResponse.json({ res });
  } catch (error) {
    console.error("Error updating member details:", error);
    return NextResponse.json(
      { error: "Error updating member details" },
      { status: 500 }
    );
  }
}
