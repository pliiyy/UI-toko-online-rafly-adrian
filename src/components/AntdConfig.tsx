"use client";
import { App, ConfigProvider } from "antd";
import React from "react";
import "@ant-design/v5-patch-for-react-19";

export default function AntdConfig({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "JetBrains Mono, serif",
        },
      }}
    >
      <App>
        <div>{children}</div>
      </App>
    </ConfigProvider>
  );
}
