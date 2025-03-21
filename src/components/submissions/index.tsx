"use client";

import { LoadingOutlined } from "@ant-design/icons";
import dynamic from "next/dynamic";

const UIDataSimulation = dynamic(
  () => import("@/components/submissions/SimulationData").then((d) => d.UI),
  {
    ssr: false,
    loading: () => <LoadingOutlined />,
  }
);
const UISimulation = dynamic(
  () => import("@/components/submissions/Simulations").then((d) => d.UI),
  {
    ssr: false,
    loading: () => <LoadingOutlined />,
  }
);

export { UIDataSimulation, UISimulation };
