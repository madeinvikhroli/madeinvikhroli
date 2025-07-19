import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        // const res = await prisma.artifacts.create({data: {
        //     name: 'Vibrant Queen',
        //     description: `Vibrant Queen celebrates the radiant spirit of motherhood. Captured on a Samsung A10s and artfully enhanced with Picsart, this striking portrait showcases a mother's innate vibrancy. The image masterfully balances raw authenticity with digital artistry, resulting in a visually captivating representation of maternal energy. available as .png`,
        //     price: 199.00,
        //     image: 'http://localhost:5000/uploads/praxham/artifacts/artifactPhoto-1752806942214-225108308.jpg',
        // }});
        // console.log(res);
        // return NextResponse.json({artifacts});
    }catch (error) {
        console.error('Error fetching artifacts:', error);
        return NextResponse.json(
        { error: 'Failed to fetch artifacts' },
        { status: 500 }
        );
    }
}