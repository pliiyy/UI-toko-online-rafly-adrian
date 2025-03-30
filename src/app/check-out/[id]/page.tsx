import { CheckOutDetailWithId } from "@/components/transactions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout",
};

type tParams = Promise<{ id: string }>;

export default async function Page({ params }: { params: tParams }) {
  const { id } = await params;
  return (
    <div className="mt-10 py-4 px-2">
      <CheckOutDetailWithId id={id} />
    </div>
  );
}
