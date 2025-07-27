import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import { supabaseServiceRole } from "../../supabase-service-role";

export async function POST(request: Request) {
  const { email, upi_id, ig_username, user_id } = await request.json();
  try {
    if (!email || !upi_id || !ig_username || !user_id) {
      console.error("Missing required fields");
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const res = await prisma.members.create({
      data: {
        email,
        upi_id,
        ig_username,
        user_id,
      },
    });

    console.log(res);
    return NextResponse.json({ res });
  } catch (error) {
    console.error("Error creating member:", error);
    try {
      if (user_id) {
        const { error: deleteError } =
          await supabaseServiceRole.auth.admin.deleteUser(user_id);
        if (deleteError) {
          console.error("Failed to delete Supabase user:", deleteError);
        } else {
          console.log("Rolled back Supabase user:", user_id);
        }
      }
    } catch (rollbackError) {
      console.error("Error during rollback:", rollbackError);
    }
    return NextResponse.json(
      { error: "Failed to create member" },
      { status: 500 }
    );
  }
}
