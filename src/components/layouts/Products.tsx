"use client";

import { Input, Pagination, Select, Spin } from "antd";
import { IProduct } from "../IInterfaces";
import { useEffect, useState } from "react";
import { ProductCard } from ".";

export const UIProducts = () => {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState<string>();
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string>();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [productsDisplay, setProductsDisplay] = useState<IProduct[]>([]);
  const [sortPrice, setSortPrice] = useState<string>("Low-High");
  const [page, setPage] = useState(1);

  useEffect(() => {
    (async () => {
      setLoading(true);
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

          setProducts(data);
          setProductsDisplay(paginate(data, 10, 1));
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    })();
  }, []);

  useEffect(() => {
    let data: IProduct[] = products;
    if (search || selectedCategories) {
      if (search) {
        data = products.filter((p) =>
          p.title.toLocaleLowerCase().includes(search)
        );
      }
      if (selectedCategories) {
        data = products.filter((p) =>
          p.category.toLocaleLowerCase().includes(selectedCategories)
        );
      }
    }
    setProductsDisplay(paginate(data, 10, page));
  }, [search, selectedCategories, page]);

  useEffect(() => {
    if (sortPrice === "Low-High") {
      setProductsDisplay((prev) => prev.sort((a, b) => a.price - b.price));
    } else {
      setProductsDisplay((prev) =>
        prev.sort((a, b) => a.price - b.price).reverse()
      );
    }
  }, [sortPrice]);

  function paginate(array: IProduct[], page_size: number, page_number: number) {
    // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
    return array.slice((page_number - 1) * page_size, page_number * page_size);
  }
  return (
    <div className="p-4">
      <div className="flex gap-2 justify-end">
        <div>
          <Select
            options={categories.map((c) => ({ label: c, value: c }))}
            placeholder="Categories"
            onChange={(e) => setSelectedCategories(e)}
            allowClear
            className="w-44"
          />
        </div>
        <div>
          <Select
            options={["Low-High", "High-Low"].map((c) => ({
              label: c,
              value: c,
            }))}
            placeholder="Sort Price"
            onChange={(e) => setSortPrice(e)}
            allowClear
            className="w-44"
            defaultValue={"Low-High"}
          />
        </div>
        <div className="w-[200px]">
          <Input.Search
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <Spin spinning={loading}>
        <div className="my-5 flex gap-5 justify-around flex-wrap">
          {productsDisplay &&
            productsDisplay.map((product) => (
              <ProductCard data={product} key={product.id} />
            ))}
        </div>
      </Spin>
      <div className="my-2 flex justify-end">
        <Pagination
          total={
            search || selectedCategories
              ? productsDisplay.length
              : products.length
          }
          pageSize={10}
          onChange={(page) => setPage(page)}
        />
      </div>
    </div>
  );
};
