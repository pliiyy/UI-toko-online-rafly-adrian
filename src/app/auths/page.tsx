import { UI } from "@/components/dashboards";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function Page() {
  return (
    <div className="p-1">
      <div>
        <UI />
      </div>
    </div>
  );
}
