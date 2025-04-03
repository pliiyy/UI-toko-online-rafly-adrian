"use client";

import { Input, Pagination, Select, Spin } from "antd";
import { IProduct } from "../IInterfaces";
import { useEffect, useState } from "react";
import { ProductCard } from ".";
import { useData } from "../contexts/ProductContext";

export const UIProducts = () => {
  const [loading, setLoading] = useState(false);
  const [sortPrice, setSortPrice] = useState<string>("Low-High");
  const { data, categories, total, categoryProduct, changePage, resetProduct } =
    useData();

  useEffect(() => {
    resetProduct(1);
  }, []);

  return (
    <div className="p-4 my-10">
      <div className="flex gap-2 justify-center flex-wrap my-8">
        <div>
          <Select
            options={categories.map((c) => ({ label: c, value: c }))}
            placeholder="Categories"
            onChange={(e) => categoryProduct(e)}
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
      </div>
      <Spin spinning={loading}>
        <div className="my-5 flex gap-5 justify-around flex-wrap">
          {sortPrice ? (
            <>
              {sortPrice === "Low-High" && (
                <>
                  {data
                    .sort((a, b) => a.price - b.price)
                    .map((product) => (
                      <ProductCard data={product} key={product.id} />
                    ))}
                </>
              )}
              {sortPrice === "High-Low" && (
                <>
                  {data
                    .sort((a, b) => a.price - b.price)
                    .reverse()
                    .map((product) => (
                      <ProductCard data={product} key={product.id} />
                    ))}
                </>
              )}
            </>
          ) : (
            <>
              {data.map((product) => (
                <ProductCard data={product} key={product.id} />
              ))}
            </>
          )}
        </div>
      </Spin>
      <div className="my-8 flex justify-center">
        <Pagination
          total={total}
          pageSize={10}
          onChange={(page) => changePage(page)}
        />
      </div>
    </div>
  );
};
