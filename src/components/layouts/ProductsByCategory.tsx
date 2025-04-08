import { useEffect, useState } from "react";
import { IProduct } from "../IInterfaces";
import { ProductCard } from ".";
import { Pagination, Spin } from "antd";
import { DoubleLeftOutlined } from "@ant-design/icons";
import Link from "next/link";

export const ProductByCategory = ({ category }: { category: string }) => {
  const [data, setData] = useState<IProduct[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const skip = (page - 1) * 10;
      await fetch(
        `https://dummyjson.com/products/category/${category}?limit=10&skip=${skip}`
      )
        .then((res) => res.json())
        .then((res) => {
          setTotal(res.total);
          setData(
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
        })
        .catch((err) => console.log(err));
      setLoading(false);
    })();
  }, [page]);
  return (
    <Spin spinning={loading}>
      <Link
        href={"/"}
        title="Back to Homepage"
        className="flex px-8 gap-2 items-center my-4"
      >
        <DoubleLeftOutlined /> Kembali
      </Link>
      <div className="my-8 font-bold text-xl text-center">
        <p>{category.toUpperCase()}</p>
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
    </Spin>
  );
};
