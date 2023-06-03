import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "../../auth/[...nextauth]/route";

export async function GET(req: NextRequest) {
  const session: any = getServerSession(nextAuthOptions);
  const resourceId = req.nextUrl.pathname.split("/")[3];
  const shoppingHistory = await prisma.shoppingHistory.findFirst({
    where: {
      id: resourceId,
      userId: session.userId,
    },
    select: {
      title: true,
      createdAt: true,
      shoppingItems: true,
    },
  });

  return NextResponse.json(shoppingHistory);
}
