"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { ICart } from "../IInterfaces";

const productsContext = createContext<{ data: ICart[]; getCarts: Function }>({
  data: [],
  getCarts: () => {},
});
export const ProductProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [products, setProducts] = useState<ICart[]>([]);

  const getCarts = async () => {
    const res = await fetch("/api/carts");
    const { data } = await res.json();
    setProducts(data);
    return data;
  };

  useEffect(() => {
    (async () => {
      await getCarts();
    })();
  }, []);
  return (
    <productsContext.Provider value={{ data: products, getCarts: getCarts }}>
      {children}
    </productsContext.Provider>
  );
};

export const useProducts = () => useContext(productsContext);
