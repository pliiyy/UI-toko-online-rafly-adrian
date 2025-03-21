import { ERole } from "@prisma/client";
import { NextRequest } from "next/server";
import React from "react";

export enum EAccess {
  Read,
  Write,
  Update,
  Delete,
  Upload,
}

export interface GetProps {
  page: number;
  pageSize: number;
  name?: string;
  tanggal?: string[];
  active?: string;
  status?: string;
  role?: ERole;
}

export type UserPropsGet = {
  page: number;
  pageSize: number;
};

export type ModalMessageProps = {
  type: "error" | "success";
  title: string;
  desc: string | React.ReactNode;
  show: boolean;
};

export const defaultPage = 1;
export const defaultPageSize = 50;

export const getQueryUrl = (req: NextRequest) => {
  return {
    page: <number>(req.nextUrl.searchParams.get("page") || defaultPage),
    pageSize: <number>(
      (req.nextUrl.searchParams.get("pageSize") || defaultPageSize)
    ),
    name: req.nextUrl.searchParams.get("name") || "",
    active: req.nextUrl.searchParams.get("active") || "",
    status: "",
    role: req.nextUrl.searchParams.get("role") || "ADMIN",
  } as GetProps;
};
