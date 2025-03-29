"use client";
import React, { useState } from "react";
import { Button, Image, Menu, MenuProps } from "antd";
import { DashboardFilled, MenuOutlined, UserOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useUser } from "../contexts/UserContext";
import { myMenu } from "./Anonymous";

export default function LayoutUser({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [inline, setInline] = useState<boolean>(false);
  const user = useUser();

  return (
    <div className="flex gap-1">
      <div className="flex-2 px-2 py-2 bg-gradient-to-tr hidden sm:block">
        <div className="flex justify-center">
          <Button size="small" block onClick={() => setInline(!inline)}>
            <MenuOutlined />
          </Button>
        </div>
        <div
          className={`w-[230px] gap-2 items-center my-1 bg-gradient-to-br from-gray-500 to-blue-500 border rounded shadow text-xs p-2 text-gray-200 ${
            inline ? "hidden" : "flex"
          }`}
        >
          <Image
            src={user && user.image ? user.image : "/favicon.ico"}
            width={50}
            alt="User Image"
          />{" "}
          <div>
            <p className="font-bold">{user && user.fullname.toUpperCase()}</p>
            <div className="flex justify-between my-1 opacity-50">
              <p>{user && user.role}</p>
            </div>
          </div>
        </div>
        <Menu
          mode="inline"
          items={
            user &&
            myMenu
              .filter((m) => m.role.length === 0 || m.role.includes(user.role))
              .map((m) => ({ key: m.key, label: m.label, icon: m.icon }))
          }
          inlineCollapsed={inline}
          className="border-none"
          onClick={(e) => router.push(e.key)}
          theme="dark"
        />
      </div>
      <div className="flex-1">
        <div
          className={`w-[96vw] ${
            inline ? "sm:w-[92vw]" : "sm:w-[82vw]"
          } h-[86vh] mx-auto`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
