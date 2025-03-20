"use client";

import { LoadingOutlined } from "@ant-design/icons";
import dynamic from "next/dynamic";

const UI = dynamic(
  () => import("@/components/standars/StandarUtils").then((d) => d.UI),
  {
    loading: () => <LoadingOutlined />,
    ssr: false,
  }
);

export { UI };
