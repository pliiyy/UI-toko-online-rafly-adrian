import { User, UserMenu } from "@prisma/client";
import React from "react";

export interface IServiceResponse<T> {
  msg: string;
  code: number;
  data?: T;
}

export interface ICardDashboard {
  name: string;
  icon: string | React.ReactNode;
  total: string;
}
interface IMenu {
  title: string;
  label: string;
  access: string[];
  key: string;
  checked: boolean;
  icon?: string | React.ReactNode;
  style?: object;
}
export interface IMenuList extends IMenu {
  children?: IMenu[];
}

export interface IUser extends User {
  UserMenu: UserMenu[];
}

export interface IProPem {
  name: string;
  maxTenor: number;
  maxPlafon: number;
  maxAngsuran: number;
  byAdmin: number;
  byTabungan: number;
  unit: number;
  margin: number;
}
export interface IJepem {
  name: string;
  penalty: number;
}
export interface IDapem {
  tanggal: Date;
  nik: string;
  namaPemohon: string;
  alamat: string;
  gajiBersih: number;
  tenor: number;
  plafon: number;
  angsuran: number;
  blokir: number;
  pelunasan: number;
  ProPem: IProPem;
  Jepem: IJepem;
}
