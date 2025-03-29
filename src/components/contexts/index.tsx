"use client";

import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ProductProvider } from "./CartContext";
import { UserProvider } from "./UserContext";

export default function AllProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GoogleOAuthProvider
      clientId={
        process.env.NEXT_PUBLIC_APP_CLIENTID ||
        "312119913529-gpumrr91qvrh53338vvd04d5kmhjrpkm.apps.googleusercontent.com"
      }
    >
      <ProductProvider>
        <UserProvider>{children}</UserProvider>
      </ProductProvider>
    </GoogleOAuthProvider>
  );
}
