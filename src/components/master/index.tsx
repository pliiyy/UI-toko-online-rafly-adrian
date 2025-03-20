"use client";

import { LoadingOutlined } from "@ant-design/icons";
import dynamic from "next/dynamic";

const UIUser = dynamic(
  () => import("@/components/master/User").then((d) => d.DataKaryawan),
  { ssr: false, loading: () => <LoadingOutlined /> }
);

export { UIUser };
