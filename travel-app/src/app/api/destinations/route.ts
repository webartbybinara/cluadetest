import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get("featured");

    const destinations = await prisma.destination.findMany({
      where: featured === "true" ? { featured: true } : undefined,
      include: { packages: { where: { active: true } } },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(destinations);
  } catch {
    return NextResponse.json({ error: "Failed to fetch destinations" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session || (session.user as { role?: string }).role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const destination = await prisma.destination.create({ data: body });
    return NextResponse.json(destination, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create destination" }, { status: 500 });
  }
}
