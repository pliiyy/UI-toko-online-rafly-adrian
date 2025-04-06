import { DetailTransaction, Product, Transaction, User } from "@prisma/client";
import React from "react";

export interface IServiceResponse<T> {
  msg: string;
  code: number;
  data?: T;
}

export interface ModalMessageProps {
  type: "error" | "success";
  show: boolean;
  title: string;
  desc: string | React.ReactNode;
}

export interface ICardDashboard {
  name: string;
  icon: string | React.ReactNode;
  total: string;
}
export interface IUser extends User {}
export interface IUserContext extends IUser {
  getUser: Function;
}

export interface IProduct {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  price: number;
  brand: string;
  dimention: {
    w: number;
    h: number;
    d: number;
  };
  createdAt: Date;
  updatedAt: Date;
  rating: { rate: number; count: number };
  reviews: IReviews[];
}

export interface IReviews {
  rating: number;
  comment: string;
  createdAt: Date;
  name: string;
}

export interface ICart extends IProduct {
  qty: number;
}

export interface IDetailTransaction extends DetailTransaction {
  Product: Product;
}

export interface ITransaction extends Transaction {
  User: IUser;
  DetailTransaction: IDetailTransaction[];
}
