import { UI } from "@/components/standars";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SOP & FAQ",
};

export default function Page() {
  return (
    <div className="p-2">
      <UI />
    </div>
  );
}
