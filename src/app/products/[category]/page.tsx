import { ProductByCategory } from "@/components/layouts";

type tParams = Promise<{ category: string }>;

export default async function Page({ params }: { params: tParams }) {
  const { category } = await params;
  return (
    <div className="mt-10 py-4 px-2">
      <ProductByCategory category={category} />
    </div>
  );
}
