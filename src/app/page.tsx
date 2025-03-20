"use client";

import { LoadingOutlined } from "@ant-design/icons";
import dynamic from "next/dynamic";
const LoginPage = dynamic(() => import("@/components/auths/LoginPage"), {
  ssr: false,
  loading: () => <LoadingOutlined />,
});

export default function Home() {
  return (
    <div className="py-20 px-2 bg-gradient-to-br h-[100vh] from-green-500 to-blue-500">
      <LoginPage />
    </div>
  );
}
