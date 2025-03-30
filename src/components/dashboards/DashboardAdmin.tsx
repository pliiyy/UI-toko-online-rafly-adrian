"use client";

import { useEffect, useState } from "react";
import { ICardDashboard, ITransaction } from "../IInterfaces";
import {
  DollarCircleFilled,
  LoadingOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { User } from "@prisma/client";

export default function DashboardAdmin() {
  const [data, setData] = useState<ICardDashboard[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const cards: ICardDashboard[] = [];
      setLoading(true);
      await fetch("/api/users")
        .then((res) => res.json())
        .then((res) => {
          cards.push({
            name: "PELANGGAN",
            icon: <UserOutlined />,
            total: (res.data as User[])
              .filter((u) => u.role === "PELANGGAN")
              .length.toString(),
          });
          cards.push({
            name: "KASIR",
            icon: <UserOutlined />,
            total: (res.data as User[])
              .filter((u) => u.role === "KASIR")
              .length.toString(),
          });
          cards.push({
            name: "ADMIN",
            icon: <UserOutlined />,
            total: (res.data as User[])
              .filter((u) => u.role === "ADMIN")
              .length.toString(),
          });
        });
      await fetch("/api/transaction")
        .then((res) => res.json())
        .then((res) => {
          const tempData: ITransaction[] = res.data;
          cards.push({
            name: "TOTAL TRANSAKSI",
            icon: <ShoppingCartOutlined />,
            total: tempData.length.toString(),
          });
          let tempNominal = 0;
          tempData.forEach((t) => {
            t.DetailTransaction.forEach(
              (d) => (tempNominal += d.price * d.qty)
            );
          });
          cards.push({
            name: "NOMINAL TRANSAKSI",
            icon: <DollarCircleFilled />,
            total: new Intl.NumberFormat("id-ID", {
              currency: "IDR",
              style: "currency",
            }).format(tempNominal),
          });
        });
      setData(cards);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="p-4">
      <div className="flex flex-wrap-reverse gap-5">
        <div className="w-[95%] m-auto bg-gray-50 sm:flex-1 border rounded shadow p-2 flex justify-center items-center">
          CHART
        </div>
        <div className="flex-1 flex justify-around flex-wrap gap-5">
          {loading ? (
            <LoadingOutlined />
          ) : (
            <>
              {data && data.map((d, i) => <CardDashboard key={i} data={d} />)}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
const CardDashboard = ({ data }: { data: ICardDashboard }) => (
  <div className=" flex-1 bg-gradient-to-br from-green-400 to-blue-500 text-gray-100 p-5 text-center rounded shadow">
    <p className="text-sm opacity-80 text-nowrap">
      {data.icon} {data.name}
    </p>
    <p className="text-2xl font-bold">{data.total}</p>
  </div>
);
