import prisma from "@/components/Prisma";
import { NextRequest, NextResponse } from "next/server";
import { CreateUser, FindUser } from "@/components/services/UserService";
import { CreateMenu } from "@/components/services/MenuService";
import { IUser } from "@/components/IInterfaces";
import { GetProps, getQueryUrl } from "@/components/utils/ServerUtils";

export const GET = async (req: NextRequest) => {
  const filter: GetProps = getQueryUrl(req);
  const data = await FindUser(
    filter.page,
    filter.pageSize,
    { namaLengkap: { contains: filter.name } },
    { UserMenu: true },
    { createdAt: "desc" }
  );
  return NextResponse.json({ msg: "Success", data }, { status: 200 });
};

export const POST = async (req: NextRequest) => {
  try {
    const data: IUser = await req.json();
    const trx = await prisma.$transaction(async (tx) => {
      const user = await CreateUser(data);
      await CreateMenu(data.UserMenu, user.data ? user.data.id : "");
      return user;
    });
    if (trx.code !== 201) {
      return NextResponse.json({ msg: trx.msg }, { status: trx.code });
    }
    return NextResponse.json(
      {
        msg: "Success",
        code: trx.code,
      },
      { status: 201 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { msg: "Username, email atau no telepon sudah digunakan!", code: 500 },
      { status: 500 }
    );
  }
};
