import prisma from "@/components/Prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { getSession, signIn, signOut } from "@/components/auths/AuthUtils";
import { User } from "@prisma/client";

export const POST = async (req: NextRequest) => {
  const { username, password }: { username: string; password: string } =
    await req.json();
  try {
    const user: User | null = await prisma.user.findFirst({
      where: { username: username.toLowerCase() },
    });
    if (!user) {
      return NextResponse.json(
        { msg: "User not found!", status: 401 },
        { status: 401 }
      );
    }
    const verify = await bcrypt.compare(password, user.password);
    if (!verify) {
      return NextResponse.json(
        { msg: "User not found!", status: 401 },
        { status: 401 }
      );
    }
    await signIn(user);
    return NextResponse.json(
      { msg: "Authenticated", status: 200, data: user },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { msg: "Internal Server Error", status: 500 },
      { status: 500 }
    );
  }
};

export const PUT = async (req: NextRequest) => {
  try {
    await signOut();
    return NextResponse.json(
      { msg: "Logout success", status: 200 },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        msg: "Internal Server Error",
        status: 500,
      },
      { status: 500 }
    );
  }
};

export const GET = async (req: NextRequest) => {
  try {
    const result = await getSession();
    if (!result) {
      return NextResponse.json(
        { msg: "Unauthorize", status: 401 },
        { status: 401 }
      );
    }
    const user = await prisma.user.findFirst({
      where: { id: result.user.id },
    });
    return NextResponse.json(
      { msg: "Success", status: 200, data: user },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { msg: "Internal Server Error", status: 500 },
      { status: 500 }
    );
  }
};
