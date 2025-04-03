"use client";

import { useEffect, useState } from "react";
import { IDetailTransaction, ITransaction } from "../IInterfaces";
import { Button, Modal, Table, TableProps } from "antd";
import moment from "moment";
import { PrinterFilled } from "@ant-design/icons";

export const TransactionHistory = () => {
  const [data, setData] = useState<ITransaction[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await fetch("/api/transaction")
        .then((res) => res.json())
        .then((res) => {
          setData(res.data);
        });
      setLoading(false);
    })();
  }, []);

  return (
    <div>
      <p className="text-xl font-bold py-4">Transaction History</p>
      <div>
        <Table
          size="small"
          bordered
          scroll={{ x: "max-content", y: 300 }}
          loading={loading}
          pagination={{ pageSize: 20, total: data.length }}
          columns={columns}
          dataSource={data.map((d) => ({ ...d, key: d.id }))}
          expandable={{
            expandedRowRender: (record) => (
              <Table
                columns={columnsExpand}
                size="small"
                bordered
                pagination={false}
                dataSource={record.DetailTransaction.map((m) => ({
                  ...m,
                  key: m.id,
                }))}
              />
            ),
          }}
        />
      </div>
    </div>
  );
};

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
    title: "Tanggal Transaksi",
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
  {
    title: "Nama Pembeli",
    key: "user",
    dataIndex: "user",
    className: "text-right text-xs",
    width: 100,
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
    title: "Total Produk",
    key: "totalProduk",
    dataIndex: "totalProduk",
    className: "text-right text-xs",
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
    title: "Status Pembayaran",
    key: "statuPembayaran",
    dataIndex: "statusPembayaran",
    className: "text-right text-xs",
    width: 100,
    onHeaderCell: () => {
      return {
        ["style"]: {
          textAlign: "center",
          fontSize: 12,
        },
      };
    },
    render(value, record, index) {
      return <>{record.status ? "BAYAR DITEMPAT" : "TRANSFER"}</>;
    },
  },
  {
    title: "Subtotal Pembelian",
    key: "Subtotal",
    dataIndex: "Subtotal",
    className: "text-right text-xs",
    width: 100,
    onHeaderCell: () => {
      return {
        ["style"]: {
          textAlign: "center",
          fontSize: 12,
        },
      };
    },
    render(value, record, index) {
      let temp = 0;
      record.DetailTransaction.forEach((d) => (temp += d.price * d.qty));
      return (
        <>
          {new Intl.NumberFormat("id-ID", {
            currency: "IDR",
            style: "currency",
          }).format(temp)}
        </>
      );
    },
  },
  {
    title: "Cetak",
    key: "cetak",
    dataIndex: "cetak",
    className: "text-right text-xs",
    width: 100,
    onHeaderCell: () => {
      return {
        ["style"]: {
          textAlign: "center",
          fontSize: 12,
        },
      };
    },
    render(value, record, index) {
      return (
        <div className="flex justify-center">
          <CetakDetail
            currData={record.DetailTransaction}
            status={record.status}
          />
        </div>
      );
    },
  },
];
const columnsExpand: TableProps<IDetailTransaction>["columns"] = [
  {
    title: "Nama Produk",
    key: "title",
    dataIndex: "title",
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
      return <>{record.Product.title}</>;
    },
  },
  {
    title: "Harga",
    key: "harga",
    dataIndex: "harga",
    className: "text-right text-xs",
    width: 100,
    onHeaderCell: () => {
      return {
        ["style"]: {
          textAlign: "center",
          fontSize: 12,
        },
      };
    },
    render(value, record, index) {
      return (
        <>
          {new Intl.NumberFormat("id-ID", {
            currency: "IDR",
            style: "currency",
          }).format(record.price)}
        </>
      );
    },
  },
  {
    title: "Jumlah",
    key: "qty",
    dataIndex: "qty",
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
  },
  {
    title: "Total",
    key: "total",
    dataIndex: "total",
    className: "text-right text-xs",
    width: 100,
    onHeaderCell: () => {
      return {
        ["style"]: {
          textAlign: "center",
          fontSize: 12,
        },
      };
    },
    render(value, record, index) {
      return (
        <>
          {new Intl.NumberFormat("id-ID", {
            currency: "IDR",
            style: "currency",
          }).format(record.price * record.qty)}
        </>
      );
    },
  },
];

const CetakDetail = ({
  currData,
  status,
}: {
  currData: IDetailTransaction[];
  status: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<IDetailTransaction[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setData(currData);
    let temp = 0;
    currData.forEach((d) => (temp += d.price * d.qty));
    setTotal(temp);
  }, [currData]);

  return (
    <div>
      <Button type="primary" onClick={() => setOpen(true)} size="small">
        <PrinterFilled />
      </Button>
      <Modal
        open={open}
        footer={[]}
        onClose={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      >
        <div className="w-[58mm] mx-auto text-xs">
          <div className="text-center my-4 border-b border-dotted">
            <div className="text-xl font-bold my-4">
              <p>Productc App</p>
              <p>Rafly Adrian</p>
            </div>
            <p className="opacity-70">Telp: (021) 222 - 333</p>
          </div>
          <div className="pb-4 border-b border-dotted">
            <div className="flex gap-2">
              <p className="w-20">No. Invoice</p>
              <p>:</p>
              <p className="text-right">INV-{moment().format("YYYYMM")}</p>
            </div>
            <div className="flex gap-2">
              <p className="w-20">Tanggal</p>
              <p>:</p>
              <p className="text-right">{moment().format("DD/MM/YYYY")}</p>
            </div>
            <div className="flex gap-2">
              <p className="w-20">Status</p>
              <p>:</p>
              <p className="text-right">
                {status ? "BAYAR DI TEMPAT" : "TRANSFER"}
              </p>
            </div>
          </div>
          <div className="my-2 py-2">
            {data.map((product) => (
              <div className="py-4 border-b border-dotted" key={product.id}>
                <p className="font-bold">{product.Product.title}</p>
                <div className="flex gap-2">
                  <p className="w-20">
                    {product.qty} x{" "}
                    {new Intl.NumberFormat("id-ID", {
                      currency: "IDR",
                      style: "currency",
                    }).format(product.price)}
                  </p>
                  <p>:</p>
                  <p className="text-right">
                    {new Intl.NumberFormat("id-ID", {
                      currency: "IDR",
                      style: "currency",
                    }).format(product.price * product.qty)}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="py-4">
            <div className="flex gap-2">
              <p className="w-20">Subtotal</p>
              <p>:</p>
              <p className="text-right">
                {new Intl.NumberFormat("id-ID", {
                  currency: "IDR",
                  style: "currency",
                }).format(total)}
              </p>
            </div>
            <div className="flex gap-2">
              <p className="w-20">PPN (11%)</p>
              <p>:</p>
              <p className="text-right">
                {new Intl.NumberFormat("id-ID", {
                  currency: "IDR",
                  style: "currency",
                }).format(total * 0.11)}
              </p>
            </div>
            <div className="flex gap-2 font-bold items-center">
              <p className="w-20">TOTAL</p>
              <p>:</p>
              <p className="text-right">
                {new Intl.NumberFormat("id-ID", {
                  currency: "IDR",
                  style: "currency",
                }).format(total - total * 0.11)}
              </p>
            </div>
          </div>
          <div className="text-center mt-8">
            <p>Terima kasih sudah berbelanja.</p>
            <p>Barang yang sudah dibeli tidak dapat dikembalikan!</p>
          </div>
        </div>
      </Modal>
    </div>
  );
};
