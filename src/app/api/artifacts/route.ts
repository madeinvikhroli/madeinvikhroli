import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const artifacts = await prisma.artifacts.findMany({ include: { from_member: true } });
        console.log(artifacts);
        return NextResponse.json({artifacts});
    }catch (error) {
        console.error('Error fetching artifacts:', error);
        return NextResponse.json(
        { error: 'Failed to fetch artifacts' },
        { status: 500 }
        );
    }
}