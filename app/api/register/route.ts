import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import bcrypt from "bcrypt";
const SALT_ROUNDS = (process.env.SALT_ROUNDS as string) || "2";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;

  try {
    const salt = await bcrypt.genSalt(parseInt(SALT_ROUNDS));
    const hash = await bcrypt.hash(password, salt);
    await prisma.user.create({
      data: {
        email: email,
        password: hash,
      },
    });

    return NextResponse.json({ created: true });
  } catch (err: any) {
    return NextResponse.json({ err: err.toString() });
  }
}
