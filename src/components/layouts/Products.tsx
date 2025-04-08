"use client";

import { useData } from "@/components/contexts/ProductContext";
import { CardCategory, ProductCard } from "@/components/layouts";
import { LoadingOutlined } from "@ant-design/icons";
import { Carousel, Image, Pagination, Select, Spin } from "antd";
import { useEffect, useState } from "react";

export const UIProducts = () => {
  const [loading, setLoading] = useState(false);
  const [loadFirst, setLoadFirst] = useState(false);
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
    setLoadFirst(true);
    (async () => {
      setLoading(true);
      await getData();
      setOrder("asc");
      setSelectedBrand("");
      setPage(1);
      setLoading(false);
    })();
    setTimeout(() => {
      setLoadFirst(false);
    }, 3000);
  }, []);

  return (
    <div>
      <div
        className={`${
          loadFirst
            ? "fixed w-[100vw] h-[100vh] bg-gradient-to-br from-green-400 to-blue-400 flex justify-center items-center z-40"
            : "hidden"
        }`}
      >
        <Image
          src={process.env.NEXT_PUBLIC_APP_ICON || "favicon.ico"}
          width={100}
          height={100}
          className="animate-pulse"
        />
      </div>
      <div>
        <div
          id="header"
          className="h-[500px] bg-gradient-to-br from-green-400 to-blue-400 relative"
        >
          <div className="flex items-center flex-wrap-reverse gap-5 py-16 px-5 sm:p-16 relative h-[90%]">
            <div className="w-[100vw] sm:flex-1 text-center font-bold text-5xl text-gray-100">
              <p className="sm:mb-5">Beparari</p>
              <p>Shop</p>
            </div>
            <div className="flex-1 flex justify-center relative">
              <Image src="/brand.png" alt="Company Logo" />
            </div>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            className="absolute -bottom-5 sm:-bottom-20"
          >
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,160L40,181.3C80,203,160,245,240,245.3C320,245,400,203,480,181.3C560,160,640,160,720,165.3C800,171,880,181,960,197.3C1040,213,1120,235,1200,208C1280,181,1360,107,1400,69.3L1440,32L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
            ></path>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            className="absolute bottom-0 sm:-bottom-10 opacity-50"
          >
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,160L40,181.3C80,203,160,245,240,245.3C320,245,400,203,480,181.3C560,160,640,160,720,165.3C800,171,880,181,960,197.3C1040,213,1120,235,1200,208C1280,181,1360,107,1400,69.3L1440,32L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>
      <div className="mt-28 p-4 bg-white ">
        <Carousel autoplay className="w-[300px] h-[300px] mx-auto">
          <Image src="/promo1.jpeg" />
          <Image src="/promo2.jpeg" />
          <Image src="/promo3.jpeg" />
        </Carousel>
      </div>
      <div className="mt-8 p-4 bg-white">
        <p className="font-bold text-xl my-8">Kategori Pilihan</p>
        <div className="flex justify-around gap-2 flex-wrap">
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
