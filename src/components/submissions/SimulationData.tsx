"use client";
import { Button, Input, Select, Table, TableProps } from "antd";
import Link from "next/link";
import { useState } from "react";

export const UI = () => {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState<string>();
  const columns: TableProps["columns"] = [
    {
      title: "NO",
      dataIndex: "no",
      className: "text-xs",
      key: "no",
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
        return <div className="text-center">{index + 1}</div>;
      },
    },
    {
      title: "NOMOR NIK",
      dataIndex: "nomorNIK",
      className: "text-xs",
      key: "nomorNIK",
      width: 150,
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
      title: "NAMA PEMOHON",
      dataIndex: "namaPemohon",
      className: "text-xs",
      key: "namaPemohon",
      width: 150,
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
      title: "ALAMAT",
      dataIndex: "alamat",
      className: "text-xs",
      key: "alamat",
      width: 250,
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
      title: "GAJI BERSIH",
      dataIndex: "gaji",
      key: "gaji",
      className: "text-xs",
      width: 120,
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
      title: "PRODUK PEMBIAYAAN",
      dataIndex: "propem",
      key: "propem",
      className: "text-xs",
      width: 120,
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
      title: "JENIS PEMBIAYAAN",
      dataIndex: "jepem",
      key: "jepem",
      className: "text-xs",
      width: 120,
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
      title: "TANGGAL SIMULASI",
      dataIndex: "createdAt",
      key: "createdAt",
      className: "text-xs text-center",
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
  ];
  return (
    <div className="p-1 bg-gray-50">
      <Table
        columns={columns}
        size="small"
        bordered
        scroll={{ x: "max-content" }}
        pagination={{
          size: "small",
          pageSizeOptions: [20, 50, 100, 500, 1000, 10000],
          defaultPageSize: 50,
        }}
        // dataSource={data}
        loading={loading}
        title={() => (
          <div>
            <div className="font-bold text-xl text-green-500 border-b">
              Data Karyawan
            </div>
            <div className="py-1 flex flex-col sm:flex-row gap-2 justify-between sm:items-end">
              <div className="flex-1 flex items-end gap-2 flex-wrap">
                <Link href={"/auths/submission/simulation/create"}>
                  <Button size="small" type="primary" className="text-xs">
                    Simulasi
                  </Button>
                </Link>
                <div className="w-32">
                  <Select
                    size="small"
                    placeholder="Tipe "
                    className="w-full"
                    options={[
                      { label: "BULANAN", value: 30 },
                      { label: "MINGGUAN", value: 7 },
                      { label: "HARIAN", value: 1 },
                    ]}
                  />
                </div>
              </div>
              <div className="flex-2">
                <Input.Search
                  placeholder="search"
                  size="small"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>
        )}
      />
    </div>
  );
};
