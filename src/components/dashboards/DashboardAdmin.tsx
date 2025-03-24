"use client";

import { useState } from "react";
import { ITransaction, IUser } from "../IInterfaces";
import { DollarCircleFilled, UserSwitchOutlined } from "@ant-design/icons";
import { Table, TableProps } from "antd";

export default function DashboardAdmin() {
  const [cards, setCards] = useState<ICardDashboard[]>([]);

  return (
    <div className="m-5">
      <div className="flex gap-4">
        <div className="flex-1 flex justify-center items-center bg-gray-50 rounded shadow-xl">
          Chart
        </div>
        <div className="flex-1 flex justify-around gap-4 items-center flex-wrap">
          <div className="bg-gradient-to-br from-blue-500 to-green-500 p-2 rounded shadow-xl text-sm text-center font-bold text-gray-200 w-56">
            <div className="opacity-50">
              <DollarCircleFilled /> <span>Total Transaksi</span>
            </div>
            <p className="text-center my-2 text-2xl">0</p>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-green-500 p-2 rounded shadow-xl text-sm text-center font-bold text-gray-200 w-56">
            <div className="opacity-50">
              <DollarCircleFilled /> <span>Nominal Transaksi</span>
            </div>
            <p className="text-center my-2 text-2xl">0</p>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-green-500 p-2 rounded shadow-xl text-sm text-center font-bold text-gray-200 w-56">
            <div className="opacity-50">
              <UserSwitchOutlined /> <span>Total Pelanggan</span>
            </div>
            <p className="text-center my-2 text-2xl">0</p>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-green-500 p-2 rounded shadow-xl text-sm text-center font-bold text-gray-200 w-56">
            <div className="opacity-50">
              <UserSwitchOutlined /> <span>Total Kasir</span>
            </div>
            <p className="text-center my-2 text-2xl">0</p>
          </div>
        </div>
      </div>
      <div className="my-5 mx-1">
        <Table
          size="small"
          bordered
          scroll={{ x: "max-content" }}
          pagination={false}
          columns={columns}
        />
      </div>
    </div>
  );
}

interface ICardDashboard {
  name: string;
  user: IUser[];
}

const columns: TableProps<ITransaction>["columns"] = [
  {
    title: "No",
    key: "no",
    dataIndex: "no",
    className: "text-center text-xs",
    width: 40,
    onHeaderCell: () => {
      return {
        ["style"]: {
          textAlign: "center",
          fontSize: 12,
        },
      };
    },
    render(value, record, index) {
      return <>{index + 1}</>;
    },
  },
  {
    title: "Nama Pengguna",
    key: "namaPengguna",
    dataIndex: "namaPengguna",
    className: "text-center text-xs",
    width: 80,
    onHeaderCell: () => {
      return {
        ["style"]: {
          textAlign: "center",
          fontSize: 12,
        },
      };
    },
    render(value, record, index) {
      return <>{record.User.fullname}</>;
    },
  },
  {
    title: "Total Transaksi",
    key: "totalTransaksi",
    dataIndex: "totalTransaksi",
    className: "text-center text-xs",
    width: 80,
    onHeaderCell: () => {
      return {
        ["style"]: {
          textAlign: "center",
          fontSize: 12,
        },
      };
    },
    render(value, record, index) {
      return <>{record.DetailTransaction.length}</>;
    },
  },
  {
    title: "Nominal Transaksi",
    key: "nominalTransaksi",
    dataIndex: "nominalTransaksi",
    className: "text-center text-xs",
    width: 80,
    onHeaderCell: () => {
      return {
        ["style"]: {
          textAlign: "center",
          fontSize: 12,
        },
      };
    },
    render(value, record, index) {
      let nominal = 0;
      record.DetailTransaction.forEach((tx) => (nominal += tx.price * tx.qty));
      return (
        <>
          {new Intl.NumberFormat("id-ID", {
            currency: "IDR",
            style: "currency",
          }).format(nominal)}
        </>
      );
    },
  },
];
