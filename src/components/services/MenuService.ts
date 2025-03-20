import prisma from "@/components/Prisma";
import { UserMenu } from "@prisma/client";
import { IServiceResponse } from "../IInterfaces";

export const CreateMenu = async (
  userMenu: UserMenu[],
  userId: string
): Promise<IServiceResponse<UserMenu[]>> => {
  const find = await prisma.user.findFirst({ where: { id: userId } });
  if (!find) return { code: 400, msg: "User tidak ditemukan" };

  await prisma.userMenu.createMany({
    data: userMenu.map((um) => {
      return { path: um.path, access: um.access, userId: userId };
    }),
  });
  return { code: 201, msg: "Success", data: userMenu };
};

export const UpdateMenu = async (userMenu: UserMenu[], userId: string) => {
  const find = await prisma.user.findFirst({ where: { id: userId } });
  if (!find) throw new Error("User tidak ditemukan");
  await prisma.userMenu.deleteMany({
    where: { userId: userId },
  });
  const newData = userMenu.map((um) => {
    return { ...um, userId: userId };
  });
  return await prisma.userMenu.createMany({ data: newData });
};
