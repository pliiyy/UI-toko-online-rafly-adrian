import { UIProducts } from "@/components/layouts";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Products" };

export default function Page() {
  return (
    <div className="pt-10">
      <UIProducts />
    </div>
  );
}
