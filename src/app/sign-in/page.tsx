import { LoginPage } from "@/components/auths";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in",
};

export default function Page() {
  return (
    <div className="my-10">
      <LoginPage />
    </div>
  );
}
