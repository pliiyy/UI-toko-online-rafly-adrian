"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { IProduct } from "../IInterfaces";
export interface IProductContext {
  data: IProduct[];
  searchProduct: Function;
  categoryProduct: Function;
  resetProduct: Function;
  changePage: Function;
  categories: string[];
  total: number;
}
const dataContext = createContext<IProductContext>({
  data: [],
  searchProduct: () => {},
  categoryProduct: () => {},
  resetProduct: () => {},
  changePage: () => {},
  categories: [],
  total: 0,
});

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [total, setTotal] = useState(0);

  const searchProducts = async (search: string) => {
    const result = data.filter((d) =>
      d.title.toLocaleLowerCase().includes(search.toLowerCase())
    );
    setProducts(result);
    if (search) {
      setTotal(result.length);
    } else {
      setTotal(data.length);
    }
  };

  const categoryProducts = (category: string) => {
    if (category === "" || category === null || !category) {
      resetProducts(1);
      return;
    } else {
      const temp = data.filter((d) => d.category === category);
      setTotal(temp.length);
      return setProducts(temp);
    }
  };
  const resetProducts = (page: number) => {
    setTotal(data.length);
    setProducts(paginate(data, 10, page));
  };

  function paginate(array: IProduct[], page_size: number, page_number: number) {
    // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
    return array.slice((page_number - 1) * page_size, page_number * page_size);
  }

  useEffect(() => {
    (async () => {
      await fetch("https://fakestoreapi.com/products")
        .then((res) => res.json())
        .then((res) => {
          const data: IProduct[] = res;
          const tempCategories = data.map((d) => d.category);
          setCategories(
            tempCategories.filter((value, index, array) => {
              return array.indexOf(value) === index;
            })
          );
          setTotal(data.length);
          setData(data);
          setProducts(paginate(data, 10, 1));
        })
        .catch((err) => {
          console.log(err);
        });
    })();
  }, []);
  return (
    <dataContext.Provider
      value={{
        data: products,
        searchProduct: searchProducts,
        categoryProduct: categoryProducts,
        resetProduct: resetProducts,
        changePage: resetProducts,
        categories: categories,
        total,
      }}
    >
      {children}
    </dataContext.Provider>
  );
};

export const useData = () => useContext(dataContext);
