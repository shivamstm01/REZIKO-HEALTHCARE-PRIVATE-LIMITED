import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const count = await prisma.product.count();
        return NextResponse.json({ status: "ok", productCount: count });
    } catch (error) {
        console.error("Health check failed:", error);
        return NextResponse.json({ status: "error", message: String(error) }, { status: 500 });
    }
}
