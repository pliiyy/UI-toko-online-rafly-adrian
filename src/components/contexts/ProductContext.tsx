"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { IProduct } from "../IInterfaces";
export interface IProductContext {
  data: IProduct[];
  categories: ICategories[];
  getData: Function;
  total: number;
  setSearch: Function;
  setPage: Function;
  setOrder: Function;
  setSelectedBrand: Function;
}
export interface ICategories {
  name: string;
  slug: string;
  image: string;
}
const dataContext = createContext<IProductContext>({
  data: [],
  categories: [],
  total: 0,
  getData: () => {},
  setSearch: () => {},
  setPage: () => {},
  setOrder: () => {},
  setSelectedBrand: () => {},
});

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [categories, setCategories] = useState<ICategories[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState<string>();
  const [page, setPage] = useState(1);
  const [orderBy, setOrderBy] = useState("asc");
  const [selectedBrand, setSelectedBrand] = useState<string>();

  const getDataProducts = async () => {
    const skip = (page - 1) * 10;
    await fetch(
      `https://dummyjson.com/products${search ? "/search?q=" + search : ""}${
        search ? "&limit=10" : "?limit=10"
      }&skip=${skip}&sortBy=price&order=${orderBy}`
    )
      .then((res) => res.json())
      .then((res) => {
        setTotal(res.total);
        console.log(res);
        if (selectedBrand) {
          setProducts(
            res.products
              .filter((f: any) => f.brand.includes(selectedBrand))
              .map((product: any) => ({
                id: product.id,
                title: product.title,
                description: product.description,
                category: product.category,
                image: product.thumbnail,
                price: product.price * 16000,
                brand: product.brand,
                dimention: {
                  w: product.dimensions.width,
                  h: product.dimensions.heigh,
                  d: product.dimensions.depth,
                },
                createdAt: product.meta.createdAt,
                updatedAt: product.meta.updatedAt,
                rating: { rate: product.rating, count: product.stock },
                reviews: product.reviews.map((review: any) => ({
                  rating: review.rating,
                  comment: review.comment,
                  createdAt: review.date,
                  name: review.reviewerName,
                })),
              }))
          );
        } else {
          setProducts(
            res.products.map((product: any) => ({
              id: product.id,
              title: product.title,
              description: product.description,
              category: product.category,
              image: product.thumbnail,
              price: product.price * 16000,
              brand: product.brand,
              dimention: {
                w: product.dimensions.width,
                h: product.dimensions.heigh,
                d: product.dimensions.depth,
              },
              createdAt: product.meta.createdAt,
              updatedAt: product.meta.updatedAt,
              rating: { rate: product.rating, count: product.stock },
              reviews: product.reviews.map((review: any) => ({
                rating: review.rating,
                comment: review.comment,
                createdAt: review.date,
                name: review.reviewerName,
              })),
            }))
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    (async () => {
      await fetch("https://dummyjson.com/products/categories")
        .then((res) => res.json())
        .then(async (res) => {
          const tempCategori: ICategories[] = [];
          for (let i = 0; i < res.length; i++) {
            await fetch(
              `https://api.unsplash.com/search/photos/?client_id=lrMOArVVgXf7xkCtbaPxkss9MTfp2Jb2L_YoSUz-Ic8&query=${res[i].name}`
            )
              .then((ress) => ress.json())
              .then((ress) => {
                tempCategori.push({
                  name: res[i].name,
                  slug: res[i].slug,
                  image: ress.results[0].urls.thumb,
                });
              });
          }
          setCategories(tempCategori);
        })
        .catch((err) => console.log(err));
    })();
  }, []);
  useEffect(() => {
    (async () => {
      await getDataProducts();
    })();
  }, [search, page, orderBy, selectedBrand]);

  return (
    <dataContext.Provider
      value={{
        data: products,
        categories: categories,
        total,
        getData: getDataProducts,
        setSearch: setSearch,
        setPage: setPage,
        setOrder: setOrderBy,
        setSelectedBrand: setSelectedBrand,
      }}
    >
      {children}
    </dataContext.Provider>
  );
};

export const useData = () => useContext(dataContext);
