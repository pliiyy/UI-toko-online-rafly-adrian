"use client";
import React, { useState } from "react";
import { Button, Drawer, Image, Menu, MenuProps, Modal } from "antd";
import {
  BookFilled,
  CalculatorFilled,
  DashboardFilled,
  DesktopOutlined,
  FormOutlined,
  LogoutOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IMenuList } from "../IInterfaces";
import { ModalMessageProps } from "../utils/ServerUtils";
import { useUser } from "../contexts/UserContext";

export default function LayoutUser({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [inline, setInline] = useState<boolean>(false);
  const [opDrawer, setOpDrawer] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [logout, setLogout] = useState(false);
  const [message, setMessage] = useState<ModalMessageProps>({
    show: false,
    title: "",
    desc: "",
    type: "error",
  });
  const user = useUser();

  const handleLogout = async () => {
    setLoading(true);
    await fetch("/api/auth", { method: "PUT" })
      .then((res) => res.json())
      .then((res: { msg: string; status: number }) => {
        if (res.status !== 200) {
          setMessage({
            type: "error",
            show: true,
            title: "Error",
            desc: (
              <div className="text-red-500">
                <p>{res.msg}</p>
              </div>
            ),
          });
          return;
        }
        setTimeout(() => {
          router.push("/");
        }, 100);
      })
      .catch((err) => {
        console.log(err);
        setMessage({
          type: "error",
          show: true,
          title: "Internal Server Error",
          desc: (
            <div className="text-red-500">
              <p>Sorry we have some problem at this time. Check again later!</p>
            </div>
          ),
        });
      });
    setLoading(false);
  };

  return (
    <div className="flex gap-1">
      <div className="flex-2 px-2 py-2 bg-gradient-to-tr from-green-400 to-blue-300 text-gray-50 hidden sm:block">
        <div className="flex justify-center">
          <Button size="small" block onClick={() => setInline(!inline)}>
            <MenuOutlined />
          </Button>
        </div>
        <div
          className={`w-[230px] gap-2 items-center my-4 bg-gradient-to-br from-gray-500 to-blue-500 border rounded shadow text-xs p-2 ${
            inline ? "hidden" : "flex"
          }`}
        >
          <Image
            src={process.env.NEXT_PUBLIC_APP_ICON || "/logo.png"}
            width={50}
            alt="User Image"
          />{" "}
          <div>
            <p className="font-bold">
              {user && user.namaLengkap.toUpperCase()}
            </p>
            <div className="flex justify-between my-1 opacity-50">
              {/* <p>IT</p>
              <p>PUSAT</p> */}
              <p>{user && user.role}</p>
            </div>
          </div>
        </div>
        <Menu
          mode="inline"
          items={menuList}
          inlineCollapsed={inline}
          className="border-none"
          onClick={(e) => router.push(e.key)}
          theme="dark"
        />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-center px-2 py-2 bg-gradient-to-tr from-green-400 to-blue-300 text-gray-50">
          <div className="flex-1 font-bold drop-shadow-md text-xl">
            {process.env.NEXT_PUBLIC_APP_SHORTNAME}
          </div>
          <div className="flex-1 items-center justify-end gap-3 hidden sm:flex me-5 text-xs">
            <div> NOTIFICATION LIST</div>
            <Link href={"#"} onClick={() => setLogout(true)}>
              <div className="py-1 px-2 text-gray-50 rounded shadow bg-red-500 text-xs hover:bg-red-600">
                <span>Logout</span> <LogoutOutlined />
              </div>
            </Link>
          </div>
          <div className="block sm:hidden">
            <Button onClick={() => setOpDrawer(true)}>
              <MenuOutlined />
            </Button>
          </div>
        </div>
        <div
          className={`w-[96vw] ${
            inline ? "sm:w-[92vw]" : "sm:w-[82vw]"
          } h-[92vh] mx-auto`}
        >
          {children}
        </div>
      </div>
      <Drawer
        title="MAIN MENU"
        open={opDrawer}
        onClose={() => setOpDrawer(false)}
        width={"80vw"}
      >
        <div className="bg-gradient-to-tr from-green-400 to-blue-500 text-gray-50">
          <Menu
            items={menuList}
            className="border-none"
            mode="inline"
            onClick={(e) => router.push(e.key)}
            theme="dark"
          />
          <div className="my-2 p-2">
            <div className="w-[100px]">
              <Link href={"/auth"}>
                <div className="p-2 text-gray-50 rounded shadow bg-red-500 text-xs hover:bg-red-600">
                  <span>Sign out</span> <LogoutOutlined />
                </div>
              </Link>
            </div>
            <div className="text-xs flex gap-2 justify-center flex-wrap my-2">
              <div>
                <p>DISIMPAN</p>
              </div>
              <div>
                <p>ANTRIAN</p>
              </div>
              <div>
                <p>APPROVAL</p>
              </div>
            </div>
          </div>
        </div>
      </Drawer>
      <Modal
        open={logout}
        title="Logout Confirmation"
        onClose={() => setLogout(false)}
        onCancel={() => setLogout(false)}
        footer={[]}
      >
        <div>
          <p>Lanjutkan untuk logout?</p>
          <p className="text-xs my-2 text-blue-500">
            Anda akan keluar dari sistem dan harus login ulang jika ingin masuk
            kembali ke dalam sistem.
          </p>
        </div>
        <div className="flex justify-end">
          <Button
            size="small"
            type="primary"
            className="text-xs"
            onClick={() => handleLogout()}
            loading={loading}
          >
            YES
          </Button>
        </div>
      </Modal>
      {message.show && (
        <Modal
          title={<span className="text-red-500">{message.title}</span>}
          footer={[]}
          onCancel={() =>
            setMessage((prev: ModalMessageProps) => {
              return { ...prev, show: false };
            })
          }
          onClose={() =>
            setMessage((prev) => {
              return { ...prev, show: false };
            })
          }
          open={message.show}
        >
          {message.desc}
        </Modal>
      )}
    </div>
  );
}

export const menus: IMenuList[] = [
  {
    title: "Dashboard",
    label: "Dashboard",
    key: "/auths",
    access: [],
    checked: false,
    icon: <DashboardFilled />,
    style: { color: "#fefe" },
  },
  {
    title: "Monitoring",
    label: "Monitoring",
    key: "/auths/monitoring",
    access: [],
    checked: false,
    icon: <DesktopOutlined />,
    style: { color: "#fefe" },
  },
  {
    title: "Pengajuan",
    label: "Pengajuan",
    key: "/submission",
    access: [],
    checked: false,
    icon: <FormOutlined />,
    style: { color: "#fefe" },
    children: [
      {
        title: "Data Pengajuan",
        label: "Data Pengajuan",
        key: "/auths/submission",
        access: [],
        checked: false,
        icon: <CalculatorFilled />,
        style: { color: "#fefe" },
      },
      {
        title: "Simulasi",
        label: "Simulasi",
        key: "/auths/submission/simulation",
        icon: <CalculatorFilled />,
        access: [],
        checked: false,
        style: { color: "#fefe" },
      },
    ],
  },
  {
    title: "Developer",
    label: "Developer",
    key: "/auths/masters",
    access: [],
    checked: false,
    icon: <BookFilled />,
    style: { color: "#fefe" },
    children: [
      {
        title: "Produk",
        label: "Produk",
        key: "/auths/masters/product",
        icon: <BookFilled />,
        access: [],
        checked: false,
        style: { color: "#fefe" },
      },
      {
        title: "Jenis Biaya",
        label: "Jenis Biaya",
        key: "/auths/masters/type",
        icon: <BookFilled />,
        access: [],
        checked: false,
        style: { color: "#fefe" },
      },
      {
        title: "Data Karyawan",
        label: "Data Karyawan",
        key: "/auths/masters/user",
        icon: <BookFilled />,
        access: [],
        checked: false,
        style: { color: "#fefe" },
      },
    ],
  },
  {
    title: "SOP / FAQ",
    label: "SOP / FAQ",
    key: "/auths/sop-faq",
    access: [],
    checked: false,
    icon: <BookFilled />,
    style: { color: "#fefe" },
  },
];

const menuList: MenuProps["items"] = menus;
