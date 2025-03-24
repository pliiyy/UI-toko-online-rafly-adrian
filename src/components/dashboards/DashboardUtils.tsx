"use client";

import dynamic from "next/dynamic";
import { useUser } from "../contexts/UserContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LoadingOutlined } from "@ant-design/icons";

const DashboardKasir = dynamic(() => import("./DashboardKasir"), {
  ssr: false,
  loading: () => <LoadingOutlined />,
});
const DashboardAdmin = dynamic(() => import("./DashboardAdmin"), {
  ssr: false,
  loading: () => <LoadingOutlined />,
});

export const UI = () => {
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user && user.role === "PELANGGAN") {
      router.push("/products");
    }
  }, [user]);

  return (
    <div>
      {user && user.role === "KASIR" ? (
        <>
          <DashboardKasir />
        </>
      ) : (
        <>
          <DashboardAdmin />
        </>
      )}
    </div>
  );
};
