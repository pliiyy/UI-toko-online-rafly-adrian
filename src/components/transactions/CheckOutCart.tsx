"use client";

import { useEffect, useState } from "react";
import { ICart, ITransaction, ModalMessageProps } from "../IInterfaces";
import { Button, Image, Select, Spin, Table, TableProps } from "antd";
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
  const [statusPaymnet, setStatusPayment] = useState(true);

  useEffect(() => {
    (async () => {
      let temp = 0;
      data.forEach((d) => {
        temp += d.price * d.qty;
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
            price: d.price,
            qty: d.qty,
            transactionId: "",
          }))
        : [],
      createdAt: new Date(),
      status: statusPaymnet,
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

        trx.DetailTransaction.forEach(async (p) => {
          await handleAction(p.Product.id, "DEL");
        });

        return setModalNotif({
          type: "success",
          show: true,
          title: "",
          desc: (
            <div className="w-[58mm] mx-auto text-xs">
              <div className="text-center my-4 border-b border-dotted">
                <div className="text-xl font-bold my-4">
                  <p>Beparari</p>
                  <p>Shop</p>
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
                    {statusPaymnet ? "BAYAR DI TEMPAT" : "TRANSFER"}
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
      title: "Gambar",
      key: "image",
      dataIndex: "image",
      className: "text-xs",
      width: 60,
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
            <Image src={record.image} alt={record.title} width={50} />
          </div>
        );
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
            }).format(record.price)}
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
            }).format(record.price * record.qty)}
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
              plafond += pd.price * pd.qty;
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
                <Table.Summary.Cell index={6}></Table.Summary.Cell>
                <Table.Summary.Cell index={7} className="text-right">
                  {new Intl.NumberFormat("id-ID", {
                    currency: "IDR",
                    style: "currency",
                  }).format(plafond)}
                </Table.Summary.Cell>
                <Table.Summary.Cell index={8}></Table.Summary.Cell>
              </Table.Summary.Row>
            );
          }}
        />
        <div className="flex justify-center">
          <div className="my-8 flex gap-4 flex-col">
            {/* <p className="font-bold text-xl my-4 text-center">Detail</p> */}
            <div className="flex gap-2">
              <p className="w-40">Tanggal</p>
              <p className="w-5">:</p>
              <p>{moment().format("DD/MM/YYYY")}</p>
            </div>
            <div className="flex gap-2">
              <p className="w-40">Total Produk</p>
              <p className="w-5">:</p>
              <p>{data.length}</p>
            </div>
            <div className="flex gap-2">
              <p className="w-40">Subtotal</p>
              <p className="w-5">:</p>
              <p>
                {new Intl.NumberFormat("id-ID", {
                  currency: "IDR",
                  style: "currency",
                }).format(total)}
              </p>
            </div>
            <div className="flex gap-2">
              <p className="w-40">Status Pembayaran</p>
              <p className="w-5">:</p>
              <p>
                <Select
                  options={[
                    { label: "BAYAR DI TEMPAT", value: true },
                    { label: "TRANSFER", value: false },
                  ]}
                  value={statusPaymnet}
                  onChange={(e) => setStatusPayment(e)}
                />
              </p>
            </div>
            <div className="my-5 flex justify-end">
              <Button
                icon={<ShoppingCartOutlined />}
                type="primary"
                onClick={() => handlePurchased()}
                loading={loading}
                disabled={
                  data.length === 0
                    ? true
                    : !user.id || user.id === ""
                    ? true
                    : loading
                }
              >
                Purchase
              </Button>
            </div>
          </div>
        </div>
      </div>
      <NotificationModal data={modalNotif} setData={setModalNotif} />
    </>
  );
};
