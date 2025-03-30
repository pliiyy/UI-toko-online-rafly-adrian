import { TransactionHistory } from "@/components/transactions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "History Transaction",
};

export default function Page() {
  return (
    <div className="p-4 bg-gray-50 rounded">
      <TransactionHistory />
    </div>
  );
}
