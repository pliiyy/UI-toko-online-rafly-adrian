"use client";
import { LoadingOutlined } from "@ant-design/icons";
import dynamic from "next/dynamic";

export const AnonymousLayout = dynamic(
  () => import("@/components/layouts/Anonymous"),
  {
    ssr: false,
    loading: () => <LoadingOutlined />,
  }
);
export const Cart = dynamic(
  () => import("@/components/layouts/Utils").then((d) => d.Cart),
  {
    ssr: false,
    loading: () => <LoadingOutlined />,
  }
);
export const ModalDetailProduct = dynamic(
  () => import("@/components/layouts/Utils").then((d) => d.ModalDetailProduct),
  {
    ssr: false,
    loading: () => <LoadingOutlined />,
  }
);

export const ProductCard = dynamic(
  () => import("@/components/layouts/Utils").then((d) => d.ProductCard),
  {
    ssr: false,
    loading: () => <LoadingOutlined />,
  }
);
export const CardCategory = dynamic(
  () => import("@/components/layouts/Utils").then((d) => d.CardCategory),
  {
    ssr: false,
    loading: () => <LoadingOutlined />,
  }
);
export const UIProducts = dynamic(
  () => import("@/components/layouts/Products").then((d) => d.UIProducts),
  {
    ssr: false,
    loading: () => <LoadingOutlined />,
  }
);
export const LoginWithGoogle = dynamic(
  () => import("@/components/layouts/Utils").then((d) => d.LoginWithGoogle),
  {
    ssr: false,
    loading: () => <LoadingOutlined />,
  }
);
export const ProductByCategory = dynamic(
  () =>
    import("@/components/layouts/ProductsByCategory").then(
      (d) => d.ProductByCategory
    ),
  {
    ssr: false,
    loading: () => <LoadingOutlined />,
  }
);
