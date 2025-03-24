"use client";

import React from "react";
import { ProductProvider } from "./CartContext";
import { UserProvider } from "./UserContext";

export default function AllProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProductProvider>
      <UserProvider>{children}</UserProvider>
    </ProductProvider>
  );
}
