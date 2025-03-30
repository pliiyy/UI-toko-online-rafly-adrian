"use client";

import { LoadingOutlined } from "@ant-design/icons";
import dynamic from "next/dynamic";

export const UserManagement = dynamic(
  () =>
    import("@/components/users/UserManagement").then((d) => d.UserManagement),
  {
    ssr: false,
    loading: () => <LoadingOutlined />,
  }
);
