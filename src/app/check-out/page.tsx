import { CheckOutCart } from "@/components/transactions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout",
};

export default function Page() {
  return (
    <div className="py-20 bg-gray-50">
      <div className="text-center text-xl font-bold my-10">
        Purchase on Cart
      </div>
      <CheckOutCart />
    </div>
  );
}
