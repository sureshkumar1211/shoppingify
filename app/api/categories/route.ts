import { prisma } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { nextAuthOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  const session: any = getServerSession(nextAuthOptions);

  const categories = await prisma.category.findMany({
    where: {
      id: session?.userId,
    },
    select: {
      id: true,
      name: true,
      ShoppingItems: true,
    },
  });
  return NextResponse.json(categories);
}
