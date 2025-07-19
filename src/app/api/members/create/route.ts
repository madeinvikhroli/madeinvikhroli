import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        // const res = await prisma.members.create({data: {
        //     email_id: 'prathampatankar1234@gmail.com',
        //     upi_id: 'prathampatankar1234@oksbi',
        //     ig_username: 'praxham',
        //     profile_image: 'http://localhost:5000/uploads/praxham/profile/profilePhoto-1752806885864-534655973.png',
        // }});
        // console.log(res)
        // return NextResponse.json({members});
    }catch (error) {
        console.error('Error fetching artifacts:', error);
        return NextResponse.json(
        { error: 'Failed to fetch artifacts' },
        { status: 500 }
        );
    }
}