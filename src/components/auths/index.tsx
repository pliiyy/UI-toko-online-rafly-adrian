"use client";

import { LoadingOutlined } from "@ant-design/icons";
import dynamic from "next/dynamic";

export const LoginPage = dynamic(() => import("@/components/auths/LoginPage"), {
  ssr: false,
  loading: () => <LoadingOutlined />,
});
export const RegisterPage = dynamic(
  () => import("@/components/auths/RegisterPage"),
  {
    ssr: false,
    loading: () => <LoadingOutlined />,
  }
);
