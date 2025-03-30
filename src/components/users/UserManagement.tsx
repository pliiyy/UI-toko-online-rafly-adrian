"use client";

import { User } from "@prisma/client";
import { Table, TableProps } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";

export const UserManagement = () => {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await fetch("/api/users")
        .then((res) => res.json())
        .then((res) => {
          setData(res.data);
        });
      setLoading(false);
    })();
  }, []);

  return (
    <div className="py-4 bg-gray-50 px-2">
      <Table
        size="small"
        bordered
        scroll={{ x: "max-content", y: 300 }}
        pagination={{ pageSize: 20, total: data.length }}
        columns={columns}
        dataSource={data.map((d) => ({ ...d, key: d.id }))}
        loading={loading}
      />
    </div>
  );
};

const columns: TableProps<User>["columns"] = [
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
    title: "Nama Lengkap",
    key: "fullname",
    dataIndex: "fullname",
    className: "text-xs",
    width: 100,
    onHeaderCell: () => {
      return {
        ["style"]: {
          textAlign: "center",
          fontSize: 12,
        },
      };
    },
  },
  {
    title: "Username",
    key: "Username",
    dataIndex: "username",
    className: "text-xs",
    width: 100,
    onHeaderCell: () => {
      return {
        ["style"]: {
          textAlign: "center",
          fontSize: 12,
        },
      };
    },
  },
  {
    title: "Email",
    key: "Email",
    dataIndex: "email",
    className: " text-xs",
    width: 100,
    onHeaderCell: () => {
      return {
        ["style"]: {
          textAlign: "center",
          fontSize: 12,
        },
      };
    },
  },
  {
    title: "Whatapps",
    key: "phone",
    dataIndex: "phone",
    className: "text-center text-xs",
    width: 100,
    onHeaderCell: () => {
      return {
        ["style"]: {
          textAlign: "center",
          fontSize: 12,
        },
      };
    },
  },
  {
    title: "Role",
    key: "role",
    dataIndex: "role",
    className: "text-center text-xs",
    width: 100,
    onHeaderCell: () => {
      return {
        ["style"]: {
          textAlign: "center",
          fontSize: 12,
        },
      };
    },
  },
  {
    title: "Tanggal Dibuat",
    key: "createdAt",
    dataIndex: "createdAt",
    className: "text-xs",
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
      return <>{moment(record.createdAt).format("DD/MM/YYYY")}</>;
    },
  },
];
