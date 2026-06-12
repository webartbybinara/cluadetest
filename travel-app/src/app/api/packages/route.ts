import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get("featured");
    const destinationId = searchParams.get("destinationId");

    const packages = await prisma.package.findMany({
      where: {
        active: true,
        ...(featured === "true" ? { featured: true } : {}),
        ...(destinationId ? { destinationId } : {}),
      },
      include: { destination: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(packages);
  } catch {
    return NextResponse.json({ error: "Failed to fetch packages" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session || (session.user as { role?: string }).role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const pkg = await prisma.package.create({
      data: body,
      include: { destination: true },
    });
    return NextResponse.json(pkg, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create package" }, { status: 500 });
  }
}
