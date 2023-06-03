import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  const session: any = await getServerSession(nextAuthOptions);
  const shoppingHistory = await prisma.shoppingHistory.findMany({
    where: {
      userId: session.userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      title: true,
      createdAt: true,
      status: true,
    },
  });
  return NextResponse.json(shoppingHistory);
}
