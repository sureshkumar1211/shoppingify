import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "../../auth/[...nextauth]/route";

export async function GET(req: Request) {
  const session: any = getServerSession(nextAuthOptions);

  const shoppingItem = await prisma.shoppingItem.findUnique({
    where: {
      id: session.userId,
    },
  });
  return NextResponse.json(shoppingItem);
}
