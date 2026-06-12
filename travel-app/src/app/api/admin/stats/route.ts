import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session || (session.user as { role?: string }).role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const [
      totalBookings,
      confirmedBookings,
      totalDestinations,
      totalPackages,
      totalMessages,
      unreadMessages,
      recentBookings,
      revenueData,
    ] = await Promise.all([
      prisma.booking.count(),
      prisma.booking.count({ where: { status: "CONFIRMED" } }),
      prisma.destination.count(),
      prisma.package.count({ where: { active: true } }),
      prisma.contactMessage.count(),
      prisma.contactMessage.count({ where: { read: false } }),
      prisma.booking.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: { package: { include: { destination: true } } },
      }),
      prisma.booking.aggregate({
        where: { status: { in: ["CONFIRMED", "COMPLETED"] } },
        _sum: { totalPrice: true },
      }),
    ]);

    return NextResponse.json({
      totalBookings,
      confirmedBookings,
      totalDestinations,
      totalPackages,
      totalMessages,
      unreadMessages,
      recentBookings,
      totalRevenue: revenueData._sum.totalPrice ?? 0,
    });
  } catch {
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
