"use client";

import { IProduct } from "@/components/IInterfaces";
import { ProductCard } from "@/components/layouts";
import { LoadingOutlined } from "@ant-design/icons";
import { Image, Input, Pagination, Select, Spin } from "antd";
import { useEffect, useState } from "react";
import ScrollAnimation from "react-animate-on-scroll";

export default function Page() {
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
    <div>
      <div>
        <div
          id="header"
          className="h-[500px] bg-gradient-to-br from-green-400 to-blue-400 "
        >
          <div className="flex items-center flex-wrap-reverse gap-5 py-16 px-5 sm:p-16 relative h-[90%]">
            <div className="w-[100vw] sm:flex-1 text-center font-bold text-4xl text-gray-100">
              <ScrollAnimation
                animateIn="flipInY"
                animateOut="flipOutY"
                initiallyVisible={true}
              >
                <p className="sm:mb-5">Example Marketplace</p>
                <p>Rafly Adrian</p>
              </ScrollAnimation>
            </div>
            <div className="flex-1 flex justify-center relative">
              <Image
                className="animate-bounce"
                src="/brand.png"
                alt="Company Logo"
              />
              <div className="absolute w-[100%]  flex justify-center top-2 sm:top-20 animate-pulse">
                <Image src="/logo.png" alt="Company Logo" width={100} />
              </div>
            </div>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            className="absolute bottom-32 sm:bottom-10 z-10"
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
            className="absolute bottom-36 sm:bottom-14 opacity-50 z-10"
          >
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,160L40,181.3C80,203,160,245,240,245.3C320,245,400,203,480,181.3C560,160,640,160,720,165.3C800,171,880,181,960,197.3C1040,213,1120,235,1200,208C1280,181,1360,107,1400,69.3L1440,32L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>
      <Spin spinning={loading} indicator={<LoadingOutlined />}>
        <div className="mt-32 my-20 p-4">
          <ScrollAnimation
            animateIn="flipInY"
            animateOut="flipOutY"
            delay={100}
          >
            <div className="border-b-2 w-[80%] sm:w-[50%] mx-auto border-blue-500 p-2 my-5">
              <p className="text-2xl font-bold text-center drop-shadow-xl">
                Our Products
              </p>
            </div>
          </ScrollAnimation>
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
          <div className="my-5 flex gap-5 justify-around flex-wrap">
            {productsDisplay &&
              productsDisplay.map((product) => (
                <ProductCard data={product} key={product.id} />
              ))}
          </div>
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
      </Spin>
    </div>
  );
}
