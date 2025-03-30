import { CheckOutDetailWithId } from "@/components/transactions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout",
};

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  return (
    <div className="mt-10 py-4 px-2">
      <CheckOutDetailWithId id={id} />
    </div>
  );
}
