"use client";

import { useData } from "@/components/contexts/ProductContext";
import { CardCategory, ProductCard } from "@/components/layouts";
import { LoadingOutlined } from "@ant-design/icons";
import { Pagination, Select, Spin } from "antd";
import { useEffect, useState } from "react";

export const UIProducts = () => {
  const [loading, setLoading] = useState(false);
  const {
    data,
    categories,
    total,
    getData,
    setOrder,
    setPage,
    setSelectedBrand,
  } = useData();

  useEffect(() => {
    (async () => {
      setLoading(true);
      await getData();
      setOrder("asc");
      setSelectedBrand("");
      setPage(1);
      setLoading(false);
    })();
  }, []);

  return (
    <div>
      <div className="mt-28 p-4 bg-white">
        <p className="font-bold text-xl my-8">Kategori Pilihan</p>
        <div className="flex justify-center gap-2 flex-wrap">
          {categories.map((c, i) => (
            <CardCategory key={i} category={c} />
          ))}
        </div>
      </div>
      <Spin spinning={loading} indicator={<LoadingOutlined />}>
        <div className="mt-32 my-20 p-4">
          <div className="border-b-2 w-[80%] sm:w-[50%] mx-auto border-blue-500 p-2 my-5">
            <p className="text-2xl font-bold text-center drop-shadow-xl">
              Rekomendasi
            </p>
          </div>
          <div className="flex gap-2 justify-center flex-wrap my-10">
            <div>
              <Select
                options={[
                  { label: "Low-High", value: "asc" },
                  { label: "High-Low", value: "desc" },
                ].map((c) => ({
                  label: c.label,
                  value: c.value,
                }))}
                onChange={(e) => setOrder(e)}
                allowClear
                className="w-44"
                defaultValue={"asc"}
              />
            </div>
            <div>
              <Select
                options={data
                  .map((d) => d.brand)
                  .filter((value, index, array) => {
                    return array.indexOf(value) === index;
                  })
                  .map((c) => ({
                    label: c,
                    value: c,
                  }))}
                placeholder="Brand"
                onChange={(e) => setSelectedBrand(e)}
                allowClear
                className="w-44"
              />
            </div>
          </div>
          <div className="my-5 flex gap-5 justify-around flex-wrap">
            {data.map((product) => (
              <ProductCard data={product} key={product.id} />
            ))}
          </div>
          <div className="my-8 flex justify-center">
            <Pagination
              total={total}
              pageSize={10}
              onChange={(page) => setPage(page)}
            />
          </div>
        </div>
      </Spin>
    </div>
  );
};
