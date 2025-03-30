import { getSession } from "@/components/auths/AuthUtils";
import { ITransaction } from "@/components/IInterfaces";
import prisma from "@/components/Prisma";
import { User } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const data: ITransaction = await req.json();
  try {
    await prisma.$transaction(async (trx) => {
      const transac = await trx.transaction.create({
        data: {
          status: data.status,
          createdAt: new Date(),
          userId: data.User.id,
        },
      });
      for (let i = 0; i < data.DetailTransaction.length; i++) {
        let find = await trx.product.findFirst({
          where: { title: data.DetailTransaction[i].Product.title },
        });
        if (!find) {
          find = await trx.product.create({
            data: {
              title: data.DetailTransaction[i].Product.title,
              price: data.DetailTransaction[i].Product.price,
              description: data.DetailTransaction[i].Product.description,
              category: data.DetailTransaction[i].Product.category,
              image: data.DetailTransaction[i].Product.image,
            },
          });
        }
        await trx.detailTransaction.create({
          data: {
            productId: find.id,
            qty: data.DetailTransaction[i].qty,
            price: data.DetailTransaction[i].price,
            transactionId: transac.id,
          },
        });
      }
    });
    return NextResponse.json(
      { msg: "Transaction Successfully Created", status: 201 },
      { status: 201 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { msg: "Internal Server Error", status: 500 },
      { status: 500 }
    );
  }
};

export const GET = async (req: NextRequest) => {
  const session: any = await getSession();
  const user: User = session.user;
  let data: ITransaction[] = [];
  if (user.role === "PELANGGAN") {
    data = <any>await prisma.transaction.findMany({
      where: { userId: user.id },
      include: {
        User: true,
        DetailTransaction: {
          include: { Product: true },
        },
      },
    });
  } else {
    data = <any>await prisma.transaction.findMany({
      include: {
        User: true,
        DetailTransaction: {
          include: { Product: true },
        },
      },
    });
  }
  return NextResponse.json(
    { msg: "SUCCESS", data: data, status: 200 },
    { status: 200 }
  );
};
