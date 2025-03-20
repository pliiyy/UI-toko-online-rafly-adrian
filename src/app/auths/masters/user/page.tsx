import { UIUser } from "@/components/master";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data Karyawan",
};
export default function Page() {
  return (
    <div>
      <UIUser />
    </div>
  );
}
