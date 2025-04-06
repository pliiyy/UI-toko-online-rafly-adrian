"use client";

import { useEffect, useState } from "react";
import { IProduct, ITransaction, ModalMessageProps } from "../IInterfaces";
import { Button, Image, Input, Select } from "antd";
import { NotificationModal } from "../layouts/Utils";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useUser } from "../contexts/UserContext";
import moment from "moment";

export const DetailProductCheckOut = ({ id }: { id: string }) => {
  const [product, setProduct] = useState<IProduct>();
  const [count, setCount] = useState(1);
  const [modalNotif, setModalNotif] = useState<ModalMessageProps>({
    type: "error",
    title: "",
    desc: "",
    show: false,
  });
  const user = useUser();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(true);

  useEffect(() => {
    (async () => {
      await fetch("https://fakestoreapi.com/products/" + id)
        .then((res) => res.json())
        .then((res) => {
          setProduct(res);
        })
        .catch((err) => {
          console.log(err);
          setModalNotif({
            show: true,
            type: "error",
            title: "ERROR",
            desc: <p className="my-2">Koneksi tidak tersedia</p>,
          });
        });
    })();
  }, []);

  const handlePurchased = async () => {
    if (!product || !user.id)
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
      DetailTransaction: [
        {
          id: "",
          productId: product.id,
          Product: product,
          price: product.price,
          qty: count,
          transactionId: "",
        },
      ],
      createdAt: new Date(),
      status: status,
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
              <div className="py-4 border-b border-dotted">
                <p className="font-bold">{product.title}</p>
                <div className="flex gap-2">
                  <p className="w-20">
                    {count} x{" "}
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
                    }).format(product.price * count)}
                  </p>
                </div>
              </div>
              <div className="py-4">
                <div className="flex gap-2">
                  <p className="w-20">Subtotal</p>
                  <p>:</p>
                  <p className="text-right">
                    {new Intl.NumberFormat("id-ID", {
                      currency: "IDR",
                      style: "currency",
                    }).format(product.price * count)}
                  </p>
                </div>
                <div className="flex gap-2">
                  <p className="w-20">PPN (11%)</p>
                  <p>:</p>
                  <p className="text-right">
                    {new Intl.NumberFormat("id-ID", {
                      currency: "IDR",
                      style: "currency",
                    }).format(product.price * count * 0.11)}
                  </p>
                </div>
                <div className="flex gap-2 font-bold items-center">
                  <p className="w-20">TOTAL</p>
                  <p>:</p>
                  <p className="text-right">
                    {new Intl.NumberFormat("id-ID", {
                      currency: "IDR",
                      style: "currency",
                    }).format(
                      product.price * count - product.price * count * 0.11
                    )}
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

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4  items-center">
        <div className="flex-1">
          <div className="flex justify-center flex-col items-center gap-4 my-6">
            <Image
              src={product && product.image}
              width={300}
              height={300}
              className="rounded shadow"
            />
            <p className="font-bold text-xl">{product && product.title}</p>
          </div>
          <div className="flex gap-2">
            <p className="w-44">Category</p>
            <p>:</p>
            <p>{product && product.category}</p>
          </div>
          <div className="flex gap-2">
            <p className="w-44">Price</p>
            <p>:</p>
            <p>
              {product &&
                new Intl.NumberFormat("id-ID", {
                  currency: "IDR",
                  style: "currency",
                }).format(product.price)}
            </p>
          </div>
          <div className="flex gap-2">
            <p className="w-44">Rate</p>
            <p>:</p>
            <p>{product && product.rating.rate}</p>
          </div>
          <div className="flex gap-2">
            <p className="w-44">Stok</p>
            <p>:</p>
            <p>{product && product.rating.count} pcs</p>
          </div>
          <div className="flex gap-2">
            <p className="w-44">Description</p>
            <p>:</p>
            <p className="flex-1">{product && product.description}</p>
          </div>
        </div>
        <div className="flex-1 bg-gray-50 p-5 rounded shadow">
          <div className="my-4">
            <p>Quantity</p>
            <Input
              type="number"
              value={count}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (value < 1) {
                  return setCount(parseInt("1"));
                }
                setCount(parseInt(e.target.value || "0"));
              }}
            />
          </div>
          <div className="my-4">
            <p>Total Payment</p>
            <Input
              disabled
              value={
                product &&
                new Intl.NumberFormat("id-ID", {
                  currency: "IDR",
                  style: "currency",
                }).format(product.price * count)
              }
            />
          </div>
          <div className="my-4">
            <p>Status Payment</p>
            <Select
              options={[
                { label: "BAYAR DI TEMPAT", value: true },
                { label: "TRANSFER", value: false },
              ]}
              onChange={(e) => setStatus(e)}
              defaultValue={true}
              value={status}
            />
          </div>
          <div className="my-10">
            <Button
              loading={loading}
              disabled={loading}
              block
              icon={<ShoppingCartOutlined />}
              type="primary"
              onClick={() => handlePurchased()}
            >
              Purchased
            </Button>
          </div>
        </div>
      </div>
      <NotificationModal data={modalNotif} setData={setModalNotif} />
    </>
  );
};
