"use client";

import { useEffect, useState } from "react";
import { ICart, ITransaction, ModalMessageProps } from "../IInterfaces";
import { Button, Spin, Table, TableProps } from "antd";
import { NotificationModal } from "../layouts/Utils";
import {
  DeleteOutlined,
  MinusCircleFilled,
  PlusCircleFilled,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { useUser } from "../contexts/UserContext";
import moment from "moment";
import { useProducts } from "../contexts/CartContext";

export const CheckOutCart = () => {
  const { data, getCarts } = useProducts();
  const [modalNotif, setModalNotif] = useState<ModalMessageProps>({
    type: "error",
    title: "",
    desc: "",
    show: false,
  });
  const user = useUser();
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    (async () => {
      let temp = 0;
      data.forEach((d) => {
        temp += d.price * d.qty * 16000;
      });
      setTotal(temp);
    })();
  }, [data]);

  const handlePurchased = async () => {
    if (!data || data.length === 0 || !user.id)
      return setModalNotif({
        type: "error",
        title: "Unauthorized",
        desc: <p className="text-red-500">Mohon login terlebih dahulu</p>,
        show: true,
      });
    setLoading(true);
    const trx: ITransaction = {
      id: "",
      User: { ...user },
      userId: "",
      DetailTransaction: data
        ? data.map((d) => ({
            id: "",
            productId: d.id,
            Product: d,
            price: d.price * 16000,
            qty: d.qty,
            transactionId: "",
          }))
        : [],
      createdAt: new Date(),
      status: false,
    };

    await fetch("/api/transaction", {
      method: "POST",
      headers: { "Content-type": "Application/json" },
      body: JSON.stringify(trx),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status !== 201) {
          return setModalNotif({
            type: "error",
            show: true,
            title: "ERROR",
            desc: <p className="text-red-500">{res.msg}</p>,
          });
        }
        return setModalNotif({
          type: "success",
          show: true,
          title: "",
          desc: (
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
                    <p className="font-bold">{product.title}</p>
                    <div className="flex gap-2">
                      <p className="w-20">
                        {product.qty} x{" "}
                        {new Intl.NumberFormat("id-ID", {
                          currency: "IDR",
                          style: "currency",
                        }).format(product.price * 16000)}
                      </p>
                      <p>:</p>
                      <p className="text-right">
                        {new Intl.NumberFormat("id-ID", {
                          currency: "IDR",
                          style: "currency",
                        }).format(product.price * product.qty * 16000)}
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
          ),
        });
      })
      .catch((err) => {
        console.log(err);
        setModalNotif({
          type: "error",
          show: true,
          title: "Error",
          desc: <p className="text-red-500">Mohon login untuk melanjutkan</p>,
        });
      });
    setLoading(false);
  };

  const handleAction = async (id: string, action: string) => {
    setLoading(true);
    await fetch("/api/carts", {
      method: "PUT",
      headers: { "Content-type": "Application/json" },
      body: JSON.stringify({ id, action }),
    })
      .then((res) => res.json())
      .then(async (res) => {
        await getCarts();
      })
      .catch((err) => {
        alert(err);
      });
    setLoading(false);
  };

  const columns: TableProps<ICart>["columns"] = [
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
      title: "Nama Produk",
      key: "title",
      dataIndex: "title",
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
      title: "Harga",
      key: "price",
      dataIndex: "price",
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
            }).format(record.price * 16000)}
          </>
        );
      },
    },
    {
      title: "Stok",
      key: "stok",
      dataIndex: "stok",
      className: "text-center text-xs",
      width: 50,
      onHeaderCell: () => {
        return {
          ["style"]: {
            textAlign: "center",
            fontSize: 12,
          },
        };
      },
      render(value, record, index) {
        return <>{record.rating.count}</>;
      },
    },
    {
      title: "Keranjang",
      key: "kerangjang",
      dataIndex: "keranjang",
      className: "text-center text-xs",
      width: 50,
      onHeaderCell: () => {
        return {
          ["style"]: {
            textAlign: "center",
            fontSize: 12,
          },
        };
      },
      render(value, record, index) {
        return <>{record.qty}</>;
      },
    },
    {
      title: "Total Pesanan",
      key: "totalPesanan",
      dataIndex: "totalPesanan",
      className: "text-right text-xs",
      width: 120,
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
            }).format(record.price * 16000 * record.qty)}
          </>
        );
      },
    },
    {
      title: "Aksi",
      key: "aksi",
      dataIndex: "aksi",
      className: "text-right text-xs",
      width: 120,
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
          <Spin spinning={loading}>
            <div className="flex flex-wrap gap-3 justify-center items-center">
              <Button
                className="bg-green-500 text-gray-200"
                size="small"
                onClick={() => handleAction(record.id, "ADD")}
                disabled={loading}
              >
                <PlusCircleFilled />
              </Button>
              <Button
                className="bg-red-500 text-gray-200"
                size="small"
                onClick={() => handleAction(record.id, "MIN")}
                loading={loading}
              >
                <MinusCircleFilled />
              </Button>
              <Button
                danger
                size="small"
                onClick={() => handleAction(record.id, "DEL")}
                loading={loading}
              >
                <DeleteOutlined />
              </Button>
            </div>
          </Spin>
        );
      },
    },
  ];

  useEffect(() => {
    (async () => await getCarts())();
  }, []);

  return (
    <>
      <div className="p-2">
        <Table
          size="small"
          bordered
          scroll={{ x: "max-content" }}
          pagination={false}
          columns={columns}
          dataSource={data.map((d) => ({ ...d, key: d.id }))}
          summary={(pageData) => {
            let plafond = 0;

            pageData.forEach((pd, i) => {
              plafond += pd.price * 16000 * pd.qty;
            });
            return (
              <Table.Summary.Row className="bg-green-500 text-white text-center text-xs">
                <Table.Summary.Cell
                  index={1}
                  className="text-center"
                ></Table.Summary.Cell>
                <Table.Summary.Cell index={2}></Table.Summary.Cell>
                <Table.Summary.Cell index={3}></Table.Summary.Cell>
                <Table.Summary.Cell index={4}></Table.Summary.Cell>
                <Table.Summary.Cell index={5}></Table.Summary.Cell>
                <Table.Summary.Cell index={6} className="text-right">
                  {new Intl.NumberFormat("id-ID", {
                    currency: "IDR",
                    style: "currency",
                  }).format(plafond)}
                </Table.Summary.Cell>
                <Table.Summary.Cell index={7}></Table.Summary.Cell>
              </Table.Summary.Row>
            );
          }}
        />
        <div className="flex justify-end my-5">
          <Button
            icon={<ShoppingCartOutlined />}
            type="primary"
            onClick={() => handlePurchased()}
            loading={loading}
            disabled={loading}
          >
            Purchase
          </Button>
        </div>
      </div>
      <NotificationModal data={modalNotif} setData={setModalNotif} />
    </>
  );
};
