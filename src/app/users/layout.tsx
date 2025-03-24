"use client";
import React from "react";
import dynamic from "next/dynamic";
import { LoadingOutlined } from "@ant-design/icons";

const LayoutUser = dynamic(() => import("@/components/layouts/LayoutUser"), {
  ssr: false,
  loading: () => <LoadingOutlined />,
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="pt-12">
      <LayoutUser>{children}</LayoutUser>
    </div>
  );
}
