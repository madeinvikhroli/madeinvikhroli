import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const members = await prisma.members.findMany({});
        return NextResponse.json({members});
    }catch (error) {
        console.error('Error fetching artifacts:', error);
        return NextResponse.json(
        { error: 'Failed to fetch artifacts' },
        { status: 500 }
        );
    }
}