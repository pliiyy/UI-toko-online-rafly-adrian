import { UserManagement } from "@/components/users";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Users Management" };

export default function Page() {
  return (
    <div>
      <UserManagement />
    </div>
  );
}
