"use client";
import { googleLogout } from "@react-oauth/google";

import {
  CopyrightCircleOutlined,
  DashboardFilled,
  DollarCircleFilled,
  HomeOutlined,
  LoginOutlined,
  LogoutOutlined,
  MenuOutlined,
  ProductOutlined,
  ShoppingCartOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Drawer, Image, Menu, Modal } from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useUser } from "../contexts/UserContext";
import { IUser, ModalMessageProps } from "../IInterfaces";

export default function Anonymous({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const user = useUser();
  const [loading, setLoading] = useState(false);
  const [logout, setLogout] = useState(false);
  const [message, setMessage] = useState<ModalMessageProps>({
    show: false,
    title: "",
    desc: "",
    type: "error",
  });
  const [tempUser, setTempUser] = useState<IUser>();

  const handleLogout = async () => {
    setLoading(true);
    await fetch("/api/auth", { method: "PUT" })
      .then((res) => res.json())
      .then(async (res: { msg: string; status: number }) => {
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
        googleLogout();
        setLogout(false);
        await user.getUser();
        setTempUser(undefined);
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
              <p>Maaf telah terjadi kesalahan. Mohon coba lagi nanti!</p>
            </div>
          ),
        });
      });
    setLoading(false);
  };
  useEffect(() => {
    setTempUser(user);
  }, [user]);
  return (
    <div className="z-40">
      <div
        className={`flex justify-between py-2 px-4 bg-gradient-to-br from-green-400 to-blue-400 opacity-50 items-center font-bold text-lg text-gray-50 fixed top-0 w-full z-10`}
      >
        <Image
          src={process.env.NEXT_PUBLIC_APP_ICON || "favicon.ico"}
          width={40}
          alt="App Icon"
        />
        <div className="drop-shadow-xl">Product Apps</div>
        <div>
          <Button ghost onClick={() => setOpen(!open)}>
            <MenuOutlined />
          </Button>
        </div>
      </div>
      <div>{children}</div>
      <div className="bg-gray-50 text-xs italic p-3">
        <CopyrightCircleOutlined /> Created By Rafly Adrian 2025
      </div>
      <Drawer
        title="MAIN  MENU"
        open={open}
        onClose={() => setOpen(false)}
        width={window.innerWidth > 600 ? "30vw" : "80vw"}
      >
        {tempUser && tempUser.id ? (
          <div className="flex gap-4 items-center justify-around">
            <div className="font-bold">{tempUser.fullname.toUpperCase()}</div>
            <div>|</div>
            <Button
              danger
              onClick={() => setLogout(true)}
              icon={<LogoutOutlined />}
              size="small"
            >
              Logout
            </Button>
          </div>
        ) : (
          <div className="flex gap-4 items-center border-b p-2">
            <Button
              icon={<LoginOutlined />}
              type="primary"
              size="small"
              className="text-xs"
              onClick={() => router.push("/sign-in")}
            >
              Sign In
            </Button>
            <div>or</div>
            <Button
              icon={<UserAddOutlined />}
              size="small"
              className="text-xs border-green-500 bg-green-500 text-gray-100"
              onClick={() => router.push("/sign-up")}
            >
              Register
            </Button>
          </div>
        )}
        {/* {!tempUser?.id ? (
          
        ) : (
          
        )} */}
        <div className="my-3">
          <Menu
            items={
              tempUser && tempUser.id
                ? myMenu
                    .filter(
                      (m) =>
                        m.role.length === 0 || m.role.includes(tempUser.role)
                    )
                    .map((m) => ({ key: m.key, label: m.label, icon: m.icon }))
                : myMenu
                    .filter((m) => m.role.length === 0)
                    .map((m) => ({ key: m.key, label: m.label, icon: m.icon }))
            }
            onClick={(e) => router.push(e.key)}
          />
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
          <p className="text-xs my-2 text-blue-500">
            Lanjutkan untuk keluar dengan menekan tombol YES
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

export const myMenu = [
  { label: "Home", key: "/", icon: <HomeOutlined />, role: [] },
  {
    label: "Product",
    key: "/products",
    icon: <ProductOutlined />,
    role: [],
  },
  {
    label: "Dashboard",
    key: "/users",
    icon: <DashboardFilled />,
    role: ["ADMIN", "KASIR"],
  },
  {
    label: "Report Transaction",
    key: "/users/transaction",
    icon: <DollarCircleFilled />,
    role: ["ADMIN", "KASIR"],
  },
  {
    label: "Users Management",
    key: "/users/user",
    icon: <UserOutlined />,
    role: ["ADMIN"],
  },
  {
    label: "Transactions",
    key: "/users/transaction",
    icon: <ShoppingCartOutlined />,
    role: ["PELANGGAN"],
  },
];
