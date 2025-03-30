"use client";

import { LoadingOutlined } from "@ant-design/icons";
import dynamic from "next/dynamic";

export const CheckOutDetailWithId = dynamic(
  () =>
    import("@/components/transactions/CheckOutDetailWithId").then(
      (d) => d.DetailProductCheckOut
    ),
  {
    ssr: false,
    loading: () => <LoadingOutlined />,
  }
);
export const CheckOutCart = dynamic(
  () =>
    import("@/components/transactions/CheckOutCart").then(
      (d) => d.CheckOutCart
    ),
  {
    ssr: false,
    loading: () => <LoadingOutlined />,
  }
);
export const TransactionHistory = dynamic(
  () =>
    import("@/components/transactions/History").then(
      (d) => d.TransactionHistory
    ),
  {
    ssr: false,
    loading: () => <LoadingOutlined />,
  }
);
