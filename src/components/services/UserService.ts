import { Prisma, User } from "@prisma/client";
import prisma from "../Prisma";
import { defaultPage, defaultPageSize } from "../GlobalUtils";
import bcrypt from "bcrypt";
import { IServiceResponse } from "../IInterfaces";

export const CreateUser = async (
  user: User
): Promise<IServiceResponse<User>> => {
  const find = await prisma.user.findFirst({
    where: {
      AND: [
        {
          isActive: true,
        },
        {
          OR: [
            { username: user.username.toLowerCase() },
            { email: user.email },
            { phone: user.phone },
          ],
        },
      ],
    },
  });
  if (find)
    return {
      code: 400,
      msg: "Username, email atau no telepon sudah digunakan",
    };

  user.username = user.username.toLowerCase();
  user.password = await bcrypt.hash(user.password, 10);
  user.createdAt = new Date();
  user.updatedAt = new Date();
  const save = await prisma.user.create({
    data: {
      namaLengkap: user.namaLengkap,
      username: user.username,
      email: user.email,
      password: user.password,
      phone: user.phone,
      nip: user.nip,
      alamat: user.alamat,
      kelurahan: user.kelurahan,
      kecamatan: user.kecamatan,
      kota: user.kota,
      provinsi: user.provinsi,
      jenisKelamin: user.jenisKelamin,
      role: user.role,
    },
  });

  return { code: 201, msg: "Success", data: save };
};

export const FindUser = async (
  page: number,
  pageSize: number,
  filters?: Prisma.UserWhereInput,
  includes?: Prisma.UserInclude,
  orderBy?: Prisma.UserOrderByWithRelationInput
) => {
  const skip = ((page || defaultPage) - 1) * (pageSize || defaultPageSize);

  return await prisma.user.findMany({
    where: filters,
    include: includes,
    skip: skip,
    take: pageSize || defaultPageSize,
    orderBy: orderBy,
  });
};

export const FindByIdUser = async (
  id: string,
  includes?: Prisma.UserInclude
) => {
  const find = await prisma.user.findFirst({
    where: {
      id: id,
    },
    include: includes,
  });
  if (!find) throw Error("User tidak ditemukan!");
  return find;
};

export const UpdateUser = async (user: User) => {
  const find = await FindByIdUser(user.id);
  if (!find) throw Error("User tidak ditemukan");
  return await prisma.user.update({
    where: { id: user.id },
    data: { ...user, updatedAt: new Date() },
  });
};

export const DeleteUser = async (id: string) => {
  const find = await prisma.user.findFirst({
    where: {
      id: id,
    },
  });
  if (!find) throw Error("User tidak ditemukan!");
  return await prisma.user.update({
    where: { id: id },
    data: { isActive: false, updatedAt: new Date() },
  });
};

export const ActivateUser = async (id: string) => {
  const find = await prisma.user.findFirst({
    where: {
      id: id,
    },
  });
  if (!find) throw Error("User tidak ditemukan!");
  return await prisma.user.update({
    where: { id: id },
    data: { isActive: true, updatedAt: new Date() },
  });
};
