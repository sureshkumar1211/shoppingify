import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "../auth/[...nextauth]/route";

export async function POST(request: Request) {
  const session: any = await getServerSession(nextAuthOptions);
  const body: any = await request.json();
  const shoppingItem = await prisma.shoppingItem.create({
    data: { ...body, userId: session.userId },
  });
  return NextResponse.json(shoppingItem);
}
