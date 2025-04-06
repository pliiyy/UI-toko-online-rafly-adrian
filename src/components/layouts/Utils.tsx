"use client";

import { useGoogleLogin } from "@react-oauth/google";
import {
  DeleteOutlined,
  DollarCircleFilled,
  GoogleCircleFilled,
  MinusCircleFilled,
  PlusCircleFilled,
  ShoppingCartOutlined,
  TagFilled,
} from "@ant-design/icons";
import { ICart, IProduct, ModalMessageProps } from "../IInterfaces";
import {
  Button,
  Image,
  Modal,
  Rate,
  Spin,
  Table,
  TableProps,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { useProducts } from "../contexts/CartContext";
import { useUser } from "../contexts/UserContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ICategories } from "../contexts/ProductContext";
import moment from "moment";
const { Paragraph } = Typography;

export const Cart = () => {
  const { data, getCarts } = useProducts();
  const [openCart, setOpenCart] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = useUser();
  const router = useRouter();

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

  const handleCheckOut = () => {
    setOpenCart(false);
    router.push("/check-out");
  };

  return (
    <>
      <div
        onClick={() => setOpenCart(true)}
        className=" text-white flex gap-1 justify-center items-center hover:text-xl cursor-pointer relative"
      >
        <ShoppingCartOutlined />
        <span className="text-xs font-bold absolute -right-2 -top-1">
          {data.length}
        </span>
      </div>
      <Modal
        open={openCart}
        onClose={() => setOpenCart(false)}
        onCancel={() => setOpenCart(false)}
        footer={[
          <div key={"login"} className="flex gap-2 justify-end items-center">
            <div
              className={`${!user.id || user.id === "" ? "flex" : "hidden"}`}
            >
              <LoginWithGoogle />
            </div>
            <div>
              <Button
                key={"checkout"}
                icon={<DollarCircleFilled />}
                type="primary"
                size="small"
                disabled={data.length === 0 ? true : !user.id ? true : false}
                onClick={() => handleCheckOut()}
              >
                Checkout
              </Button>
            </div>
          </div>,
        ]}
        title="Keranjang Saya"
        width={window && window.innerWidth > 600 ? "80vw" : "98vw"}
        style={{ top: 20 }}
      >
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
      </Modal>
    </>
  );
};

export const ProductCard = ({ data }: { data: IProduct }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border rounded shadow-md p-1 w-[150px] h-[250px] sm:w-[250px] sm:h-[370px] bg-slate-50 hover:scale-[.99] cursor-pointer">
      <div className="w-[100px] h-[90px] sm:w-[250px] sm:h-[250px] rounded mx-auto">
        <Image
          src={data.image}
          width={"100%"}
          height={"100%"}
          className="rounded"
          alt={data.title}
        />
      </div>
      <div
        className="mt-1 flex flex-col gap-1 p-2"
        onClick={() => setOpen(true)}
      >
        <div className="font-bold text-sm text-center">
          <Paragraph
            ellipsis={{
              rows: 1,
              expandable: "collapsible",
            }}
          >
            {data.title}
          </Paragraph>
        </div>
        <div className="flex gap-2 text-xs justify-between items-end">
          <div>
            <div>
              <Rate
                defaultValue={data.rating.rate}
                style={{ fontSize: 9 }}
                disabled
              />
            </div>
            <p>{moment(data.createdAt).format("DD/MM/YYYY")}</p>
            <p>
              <span>Stock: </span> {data.rating.count}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            {data.brand ? (
              <p>
                <span>Brand: </span> {data.brand}
              </p>
            ) : (
              <p className="text-green-500">Price </p>
            )}
            <p className="text-green-500">
              {new Intl.NumberFormat("id-ID", {
                currency: "IDR",
                style: "currency",
              }).format(data.price)}
            </p>
          </div>
        </div>
      </div>
      <ModalDetailProduct open={open} setOpen={setOpen} data={data} />
    </div>
  );
};

export const ModalDetailProduct = ({
  open,
  setOpen,
  data,
}: {
  open: boolean;
  setOpen: Function;
  data: IProduct;
}) => {
  const [loading, setLoading] = useState(false);
  const product = useProducts();
  const [productInCart, setProductInCat] = useState<ICart>();
  const [errMessage, setErrMesage] = useState<string | React.ReactNode>();
  const user = useUser();
  const router = useRouter();

  const handleAddCart = async () => {
    if (data.rating.count <= 0) {
      return setErrMesage(
        "Tidak bisa memasukan kedalam keranjang, karena stok produk tidak mencukupi!"
      );
    }
    if (productInCart && data.rating.count <= productInCart.qty) {
      return setErrMesage(
        "Tidak bisa memasukan lagi kedalam keranjang, karena stok produk tidak mencukupi!"
      );
    }
    setLoading(true);
    const res = await fetch("/api/carts", {
      method: "POST",
      headers: { "Content-type": "Application/json" },
      body: JSON.stringify(data),
    });
    product.getCarts();
    setLoading(false);
  };

  const handlePurchase = () => {
    if (!user.id) {
      return setErrMesage(
        <div className="my-3">
          <p>Anda harus login untuk melakukan pembelian!</p>
          <div className="flex gap-2 justify-end">
            <Link href={"/sign-in"}>
              <Button type="primary">Login Now</Button>
            </Link>
            <p>or</p>
            <LoginWithGoogle />
          </div>
        </div>
      );
    }
    router.push("/check-out/" + data.id);
  };

  useEffect(() => {
    const filter = product.data.filter((p) => p.id == data.id);
    if (filter.length !== 0) {
      setProductInCat(filter[0]);
    }
  }, [product.data]);

  return (
    <Modal
      open={open}
      title={data.title}
      onCancel={() => setOpen(false)}
      onClose={() => setOpen(false)}
      width={window && window.innerWidth > 600 ? "80vw" : "98vw"}
      style={{ top: 20 }}
      footer={[]}
    >
      <div className="my-2 p-2 flex flex-wrap gap-4">
        <div className="flex-1 flex justify-center my-4 sm:my-0">
          <Image
            src={data.image}
            width={window && window.innerWidth > 600 ? 300 : 200}
            height={window && window.innerWidth > 600 ? 300 : 200}
            className="shadow-2xl"
            alt={data.title}
          />
        </div>
        <div className="flex-1 flex flex-col gap-1">
          <div className="flex gap-2 font-bold">
            <p className="w-28">Nama Produk</p>
            <p className="w-2 sm:w-10">:</p>
            <p className="w-[200px] sm:w-[400px]">{data.title}</p>
          </div>
          <div className="flex gap-2">
            <p className="w-28">Harga</p>
            <p className="w-2 sm:w-10">:</p>
            <p className="w-[200px] sm:w-[400px]">
              {new Intl.NumberFormat("id-ID", {
                currency: "IDR",
                style: "currency",
              }).format(data.price)}
            </p>
          </div>
          <div className="flex gap-2">
            <p className="w-28">Stok</p>
            <p className="w-2 sm:w-10">:</p>
            <p className="w-[200px] sm:w-[400px]">{data.rating.count}</p>
          </div>
          <div className="flex gap-2">
            <p className="w-28">Rating</p>
            <p className="w-2 sm:w-10">:</p>
            <p className="w-[200px] sm:w-[400px]">{data.rating.rate}</p>
          </div>
          <div className="flex gap-2">
            <p className="w-28">Deskripsi</p>
            <p className="w-2 sm:w-10">:</p>
            <p className="w-[200px] sm:w-[400px]">{data.description}</p>
          </div>
        </div>
      </div>
      <div className="text-right text-xss italic text-red-500">
        {errMessage}
      </div>
      <div className="flex justify-end gap-2">
        <div key={"cart"}>
          {!productInCart ? (
            <Button
              icon={<PlusCircleFilled />}
              type="primary"
              size="small"
              className="text-xs"
              onClick={() => handleAddCart()}
              disabled={data.rating.count === 0 ? true : loading}
              loading={loading}
            >
              Keranjang
            </Button>
          ) : (
            <div className="flex gap-2">
              <p>{productInCart.qty} di Keranjang</p>
              <Button
                icon={<PlusCircleFilled />}
                type="primary"
                size="small"
                className="text-xs"
                onClick={() => handleAddCart()}
                disabled={data.rating.count === 0 ? true : loading}
                loading={loading}
              >
                Tambahkan
              </Button>
            </div>
          )}
        </div>
        <Button
          icon={<TagFilled />}
          size="small"
          className="text-xs border-green-500 bg-green-500 text-gray-100"
          disabled={data.rating.count === 0 ? true : loading}
          loading={loading}
          onClick={() => handlePurchase()}
        >
          Beli
        </Button>
        ,
      </div>
    </Modal>
  );
};

export const NotificationModal = ({
  data,
  setData,
}: {
  data: ModalMessageProps;
  setData: Function;
}) => {
  return (
    <Modal
      open={data.show}
      onCancel={() => setData((prev: any) => ({ ...prev, show: false }))}
      onClose={() => setData((prev: any) => ({ ...prev, show: false }))}
      title={
        <p
          className={`font-bold text-xs${
            data.type === "error" ? "text-red-500" : "text-green-500"
          }`}
        >
          {data.title}
        </p>
      }
      footer={[]}
    >
      <div>{data.desc}</div>
    </Modal>
  );
};

export const LoginWithGoogle = () => {
  const [notifData, setNotifData] = useState<ModalMessageProps>({
    type: "error",
    show: false,
    title: "",
    desc: "",
  });
  const [loading, setLoading] = useState(false);
  const { getUser } = useUser();
  const router = useRouter();

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const userInfo = await fetch(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenResponse.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
            Accept: "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((res) => res)
        .catch((err) => console.log(err));

      const userData = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-type": "Application/json",
        },
        body: JSON.stringify(userInfo),
      })
        .then((res) => res.json())
        .then(async (res) => {
          return res.data;
        })
        .catch((err) => {
          console.log(err);
          setNotifData({
            show: true,
            title: "Internal Server Error",
            desc: (
              <div className="text-red-500">
                <p>Maaf telah terjadi kesalahan. Mohon coba lagi nanti!</p>
              </div>
            ),
            type: "error",
          });
        });
      await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-type": "Application/json" },
        body: JSON.stringify({
          username: userData.username,
          password: "123123",
        }),
      })
        .then((res) => res.json())
        .then(async (res) => {
          setLoading(false);
          if (res.status !== 200) {
            setNotifData({
              type: "error",
              title: "Authentication Failed",
              show: true,
              desc: (
                <div>
                  <p className="text-red-500">
                    Username, Email atau Password Salah!
                  </p>
                  <div className="text-xs text-blue-500 italic my-1">
                    <p>
                      Username , Email atau password salah. atau mungkin anda
                      belum melakukan pendaftaran di platform ini!
                    </p>
                  </div>
                </div>
              ),
            });
            return;
          }
          await getUser();
          if (res.data.role === "PELANGGAN") {
            router.push("/products");
          } else {
            router.push("/users");
          }
          return;
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
          setNotifData({
            type: "error",
            title: "Internal Server Error",
            show: true,
            desc: (
              <div className="text-red-500">
                <p>Maaf telah terjadi kesalahan. Mohon coba lagi nanti!</p>
              </div>
            ),
          });

          return;
        });
    },
  });
  return (
    <div>
      <Button
        icon={<GoogleCircleFilled />}
        block
        type="primary"
        htmlType="button"
        onClick={() => googleLogin()}
        loading={loading}
        disabled={loading}
      >
        Login with Google
      </Button>
      <NotificationModal data={notifData} setData={setNotifData} />
    </div>
  );
};

export const CardCategory = ({ category }: { category: ICategories }) => {
  return (
    <Link href={`/products/${category.slug}`} title={category.name}>
      <div
        className="w-32 h-40 text-center p-2 border rounded shadow flex flex-col gap-1 items-center"
        key={category.name}
      >
        <Image
          src={category.image}
          width={100}
          height={100}
          className="rounded"
        />
        {category.name}
      </div>
    </Link>
  );
};
