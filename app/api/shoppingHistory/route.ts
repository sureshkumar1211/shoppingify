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
export async function POST(req: Request) {
  const body = await req.json();
  const session: any = await getServerSession(nextAuthOptions);
  const shoppingHistory = await prisma.shoppingHistory.create({
    data: {
      userId: session.userId,
      title: body.title,
      status: body.status,
      purchaseItems: {
        create: body.purchaseItems,
      },
    },
  });
  return NextResponse.json(shoppingHistory);
}
