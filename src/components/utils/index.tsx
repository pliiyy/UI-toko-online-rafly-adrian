"use client";

import { LoadingOutlined } from "@ant-design/icons";
import dynamic from "next/dynamic";

const ViewArchive = dynamic(
  () => import("@/components/utils/UIUtils").then((d) => d.ViewArchive),
  {
    ssr: false,
    loading: () => <LoadingOutlined />,
  }
);
const CreateAkad = dynamic(
  () => import("@/components/utils/UIUtils").then((d) => d.CreateAkad),
  {
    ssr: false,
    loading: () => <LoadingOutlined />,
  }
);

export { ViewArchive, CreateAkad };
