import { IUser } from "@/components/IInterfaces";
import prisma from "@/components/Prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (req: NextRequest) => {
  const data: IUser = await req.json();
  try {
    const find = await prisma.user.findFirst({
      where: {
        OR: [
          { username: data.username },
          { email: data.email },
          { phone: data.phone },
        ],
      },
    });

    if (find)
      return NextResponse.json(
        {
          msg: "Username / Email / Whatsapp telah digunakan. Mohon gunakan data yang lain!",
          status: 400,
        },
        { status: 400 }
      );
    const pass = await bcrypt.hash(data.password, 10);
    const result = await prisma.user.create({
      data: {
        fullname: data.fullname,
        username: data.username,
        email: data.email,
        phone: data.phone,
        password: pass,
        address: data.address,
        role: data.role,
      },
    });
    return NextResponse.json(
      {
        data: result,
        msg: "Selamat anda berhasil registrasi. Mohon login untuk melanjutkan",
        status: 201,
      },
      { status: 201 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        msg: "Maaf telahterjadi kesalahan. Mohon coba lagi nanti!",
        status: 500,
      },
      { status: 500 }
    );
  }
};

export const GET = async (req: NextRequest) => {
  const data = await prisma.user.findMany();
  return NextResponse.json({ data: data }, { status: 200 });
};
