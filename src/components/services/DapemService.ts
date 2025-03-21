import { Dapem, Prisma } from "@prisma/client";
import { defaultPage, defaultPageSize } from "../utils/ServerUtils";
import prisma from "../Prisma";
import { IServiceResponse } from "../IInterfaces";

export const CreateDapem = async (
  dapem: Dapem
): Promise<IServiceResponse<Dapem>> => {
  // if (find)
  //   return {
  //     code: 400,
  //     msg: "Username, email atau no telepon sudah digunakan",
  //   };

  return { code: 201, msg: "Success", data: dapem };
};

export const FindUser = async (
  page: number,
  pageSize: number,
  filters?: Prisma.DapemWhereInput,
  includes?: Prisma.DapemInclude,
  orderBy?: Prisma.DapemOrderByWithRelationInput
) => {
  const skip = ((page || defaultPage) - 1) * (pageSize || defaultPageSize);

  return await prisma.dapem.findMany({
    where: filters,
    include: includes,
    skip: skip,
    take: pageSize || defaultPageSize,
    orderBy: orderBy,
  });
};
