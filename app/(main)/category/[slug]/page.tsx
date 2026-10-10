import { notFound } from "next/navigation";
import { getCategories, getProducts } from "@/lib/api";
import type { Product } from "@/lib/api";
import CategoryList from "@/components/category-list";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const categories = await getCategories();
  const category = categories.find((c) => c.slug === slug);

  // wrong category name in the url -> 404 page
  if (!category) {
    notFound();
  }

  let products: Product[] = [];
  try {
    products = await getProducts(slug);
  } catch (error) {
    products = [];
  }

  return <CategoryList category={category} products={products} />;
}
