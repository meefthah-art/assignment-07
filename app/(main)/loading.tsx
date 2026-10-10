import ProductSkeleton from "@/components/product-skeleton";

// shown while the home page or a category page is loading
export default function Loading() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="skeleton mb-3 h-8 w-64"></div>
      <div className="skeleton mb-6 h-4 w-48"></div>
      <ProductSkeleton count={6} />
    </main>
  );
}
