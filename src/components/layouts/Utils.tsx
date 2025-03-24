"use client";

import {
  DeleteOutlined,
  DollarCircleFilled,
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
  Spin,
  Table,
  TableProps,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { useProducts } from "../contexts/CartContext";
const { Paragraph } = Typography;

export const Cart = () => {
  const { data, getCarts } = useProducts();
  const [openCart, setOpenCart] = useState(false);
  const [loading, setLoading] = useState(false);

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

  return (
    <>
      <div
        onClick={() => setOpenCart(true)}
        className="fixed right-8 bottom-8 bg-red-500 w-12 h-12 rounded-full shadow text-white flex gap-1 justify-center items-center hover:text-xl hover:bg-red-600 cursor-pointer z-40 animate-pulse"
      >
        <ShoppingCartOutlined />
        <span className="text-xs font-bold">{data.length}</span>
      </div>
      <Modal
        open={openCart}
        onClose={() => setOpenCart(false)}
        onCancel={() => setOpenCart(false)}
        footer={[
          <Button
            key={"checkout"}
            icon={<DollarCircleFilled />}
            type="primary"
            size="small"
            disabled={data.length === 0 ? true : false}
          >
            Checkout
          </Button>,
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
      </Modal>
    </>
  );
};

export const ProductCard = ({ data }: { data: IProduct }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border rounded shadow-md p-1 w-[280px] h-[400px] bg-slate-50 hover:scale-[.99] cursor-pointer">
      <div className="w-[260px] h-[280px] rounded mx-auto">
        <Image
          src={data.image}
          width={"100%"}
          height={"100%"}
          className="rounded"
          alt={data.title}
        />
      </div>
      <div
        className="mt-3 flex flex-col gap-3 p-2"
        onClick={() => setOpen(true)}
      >
        <div className="font-bold text-sm text-center">
          <Paragraph
            ellipsis={{
              rows: 2,
              expandable: "collapsible",
            }}
            className="text-xs"
          >
            {data.title}
          </Paragraph>
        </div>
        <div className="flex gap-4 text-xs justify-between">
          <div>
            <p>
              <span className="opacity-50">Rate: </span>
              {data.rating.rate} / 5
            </p>
            <p>
              <span className="opacity-50">Stock: </span> {data.rating.count}
            </p>
          </div>
          <div className="text-green-500">
            <p className="text-xs opacity-50">Price</p>
            <p>
              {new Intl.NumberFormat("id-ID", {
                currency: "IDR",
                style: "currency",
              }).format(data.price * 16000)}
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

  const handleAddCart = async () => {
    if (data.rating.count <= 0) {
      return alert(
        "Tidak bisa memasukan kedalam keranjang, karena stok produk tidak mencukupi!"
      );
    }
    if (productInCart && data.rating.count <= productInCart.qty) {
      return alert(
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
              }).format(data.price * 16000)}
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
