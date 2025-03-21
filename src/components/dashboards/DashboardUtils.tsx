"use client";

import {
  DollarCircleFilled,
  FileFilled,
  FileTextFilled,
} from "@ant-design/icons";
import { ICardDashboard } from "../IInterfaces";
import { Table, TableProps } from "antd";

export const UI = () => {
  const data: ICardDashboard[] = [
    { name: "Antrian", icon: <FileFilled />, total: "5" },
    { name: "Proses", icon: <FileTextFilled />, total: "5" },
    { name: "Pencairan", icon: <DollarCircleFilled />, total: "5" },
  ];

  return (
    <div>
      <div className="flex flex-wrap-reverse gap-5">
        <div className="w-[95%] m-auto bg-gray-50 sm:flex-1 border rounded shadow p-2"></div>
        <div className="flex-1 flex justify-around flex-wrap gap-5">
          {data.map((d, i) => (
            <CardDashboard key={i} data={d} />
          ))}
        </div>
      </div>
      <div className="mt-2">
        <TableProducts />
      </div>
      <div className="mt-2">
        <TableMOC />
      </div>
    </div>
  );
};

const CardDashboard = ({ data }: { data: ICardDashboard }) => (
  <div className=" flex-1 bg-gradient-to-br from-green-400 to-blue-500 text-gray-100 p-5 text-center rounded shadow">
    <p className="text-sm opacity-80 text-nowrap">
      {data.icon} {data.name}
    </p>
    <p className="text-2xl font-bold">{data.total}</p>
  </div>
);

export const TableProducts = () => {
  const columns: TableProps["columns"] = [
    {
      title: "PRODUCT NAME",
      dataIndex: "name",
      key: "name",
      width: 150,
      onHeaderCell: () => {
        return {
          ["style"]: {
            textAlign: "center",
          },
        };
      },
    },
    {
      title: "ANTRIAN",
      dataIndex: "antrian",
      key: "antrian",
      width: 150,
      onHeaderCell: () => {
        return {
          ["style"]: {
            textAlign: "center",
          },
        };
      },
    },
    {
      title: "PROSES",
      dataIndex: "proses",
      key: "proses",
      width: 150,
      onHeaderCell: () => {
        return {
          ["style"]: {
            textAlign: "center",
          },
        };
      },
    },
    {
      title: "PENCAIRAN",
      dataIndex: "pencairan",
      key: "pencairan",
      width: 150,
      onHeaderCell: () => {
        return {
          ["style"]: {
            textAlign: "center",
          },
        };
      },
    },
    {
      title: "OS",
      dataIndex: "os",
      key: "os",
      width: 150,
      onHeaderCell: () => {
        return {
          ["style"]: {
            textAlign: "center",
          },
        };
      },
    },
  ];
  return (
    <div>
      <Table
        columns={columns}
        size="small"
        bordered
        pagination={false}
        title={() => (
          <div className="font-bold text-xl text-green-500">
            Pencairan By Product
          </div>
        )}
      />
    </div>
  );
};
export const TableMOC = () => {
  const columns: TableProps["columns"] = [
    {
      title: "NAMA LENGKAP",
      dataIndex: "name",
      key: "name",
      width: 150,
      onHeaderCell: () => {
        return {
          ["style"]: {
            textAlign: "center",
          },
        };
      },
    },
    {
      title: "POSISI",
      dataIndex: "posisi",
      key: "posisi",
      width: 150,
      onHeaderCell: () => {
        return {
          ["style"]: {
            textAlign: "center",
          },
        };
      },
    },
    {
      title: "NOA",
      dataIndex: "noa",
      key: "noa",
      width: 150,
      onHeaderCell: () => {
        return {
          ["style"]: {
            textAlign: "center",
          },
        };
      },
    },
    {
      title: "PLAFOND",
      dataIndex: "plafond",
      key: "plafond",
      width: 150,
      onHeaderCell: () => {
        return {
          ["style"]: {
            textAlign: "center",
          },
        };
      },
    },
  ];
  return (
    <div>
      <Table
        columns={columns}
        size="small"
        bordered
        pagination={false}
        title={() => (
          <div className="font-bold text-xl text-green-500">
            Pencapaian Marketing
          </div>
        )}
      />
    </div>
  );
};
