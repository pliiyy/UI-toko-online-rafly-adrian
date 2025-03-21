"use client";
import React from "react";
import dynamic from "next/dynamic";
import { LoadingOutlined } from "@ant-design/icons";
import { UserProvider } from "@/components/contexts/UserContext";

const LayoutUser = dynamic(() => import("@/components/layouts/LayoutUser"), {
  ssr: false,
  loading: () => <LoadingOutlined />,
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <LayoutUser>{children}</LayoutUser>
    </UserProvider>
  );
}
