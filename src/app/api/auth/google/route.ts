import prisma from "@/components/Prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (req: NextRequest) => {
  const data = await req.json();
  try {
    const findUser = await prisma.user.findFirst({
      where: { email: data.email },
    });
    if (!findUser) {
      const pass = await bcrypt.hash("123123", 10);
      const save = await prisma.user.create({
        data: {
          fullname: data.name,
          email: data.email,
          username: data.name.replaceAll(" ", "").toLowerCase(),
          password: pass,
          role: "PELANGGAN",
          image: data.picture,
          createdAt: new Date(),
          updatedAt: new Date(),
          phone: "628",
          address: "Not Set",
        },
      });
      return NextResponse.json(
        { msg: "Berhasil Login", status: 201, data: save },
        { status: 201 }
      );
    }
    return NextResponse.json(
      { msg: "Berhasil Login", status: 200, data: findUser },
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
