"use client";

import { LoadingOutlined } from "@ant-design/icons";
import dynamic from "next/dynamic";

const UI = dynamic(() => import("./DashboardUtils").then((d) => d.UI), {
  ssr: false,
  loading: () => <LoadingOutlined />,
});

export { UI };
