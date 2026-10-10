import Link from "next/link";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { auth } from "@/lib/auth";
import { getProducts } from "@/lib/api";
import type { Product } from "@/lib/api";
import { formatPrice, unitBn } from "@/lib/helpers";
import ChangeBadge from "@/components/change-badge";
import MarketTable from "@/components/market-table";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // this page is only for logged in users
  let session = null;
  try {
    session = await auth.api.getSession({ headers: await headers() });
  } catch (error) {
    session = null;
  }

  if (!session) {
    const next = encodeURIComponent("/product/" + slug);
    redirect("/signin?reason=protected&next=" + next);
  }

  let products: Product[] = [];
  let failed = false;
  try {
    products = await getProducts();
  } catch (error) {
    failed = true;
  }

  if (failed) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-16">
        <div className="rounded-xl border border-base-300 bg-white p-10 text-center">
          <div className="text-5xl">⚠️</div>
          <h2 className="mt-3 text-xl font-bold">তথ্য পাওয়া যাচ্ছে না</h2>
          <p className="mt-2 text-base-content/60">কিছুক্ষণ পর আবার চেষ্টা করুন।</p>
        </div>
      </main>
    );
  }

  const product = products.find((p) => p.slug === slug || String(p.id) === slug);
  if (!product) {
    notFound();
  }

  // min, max and average price from all the markets
  const mins = product.markets.map((m) => m.min);
  const maxs = product.markets.map((m) => m.max);
  const minPrice = mins.length > 0 ? Math.min(...mins) : product.today;
  const maxPrice = maxs.length > 0 ? Math.max(...maxs) : product.today;

  let total = 0;
  product.markets.forEach((m) => {
    total = total + (m.min + m.max) / 2;
  });
  const avgPrice =
    product.markets.length > 0
      ? Math.round(total / product.markets.length)
      : product.today;

  const unit = unitBn(product.unit);

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      {/* breadcrumb */}
      <nav className="mb-5 flex flex-wrap items-center gap-1 text-sm text-base-content/60">
        <Link href="/" className="hover:text-primary">
          হোম
        </Link>
        <ChevronRight size={14} />
        <Link href={"/category/" + product.category} className="hover:text-primary">
          {product.categoryNameBn}
        </Link>
        <ChevronRight size={14} />
        <span className="font-medium text-base-content">{product.nameBn}</span>
      </nav>

      {/* top summary */}
      <section className="rounded-xl border border-base-300 bg-white p-5 sm:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-5">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-base-200 text-6xl">
              {product.image}
            </div>
            <div>
              <h1 className="text-3xl font-bold">{product.nameBn}</h1>
              <p className="mt-1 text-sm text-base-content/70">
                {product.markets.length}টি বাজারের তথ্য অনুযায়ী আজ {product.nameBn}-এর
                গড় দাম {formatPrice(avgPrice)} টাকা (প্রতি {unit})।
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Link
                  href={"/category/" + product.category}
                  className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
                >
                  {product.categoryIcon} {product.categoryNameBn}
                </Link>
                <span className="rounded-full bg-base-200 px-3 py-1 text-sm font-medium">
                  প্রতি {unit}
                </span>
              </div>
            </div>
          </div>

          <div className="md:text-right">
            <p className="text-sm text-base-content/60">আজকের দাম</p>
            <p className="text-4xl font-bold">
              {formatPrice(product.today)}{" "}
              <span className="text-base font-medium text-base-content/60">
                টাকা / {unit}
              </span>
            </p>
            <div className="mt-2">
              <ChangeBadge change={product.change} />
            </div>
          </div>
        </div>

        {/* min max avg */}
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-xl bg-base-200 p-4 text-center">
            <p className="text-sm text-base-content/60">সর্বনিম্ন দাম</p>
            <p className="mt-1 text-2xl font-bold">{formatPrice(minPrice)} টাকা</p>
          </div>
          <div className="rounded-xl bg-base-200 p-4 text-center">
            <p className="text-sm text-base-content/60">সর্বোচ্চ দাম</p>
            <p className="mt-1 text-2xl font-bold">{formatPrice(maxPrice)} টাকা</p>
          </div>
          <div className="rounded-xl bg-base-200 p-4 text-center">
            <p className="text-sm text-base-content/60">গড় দাম</p>
            <p className="mt-1 text-2xl font-bold text-primary">
              {formatPrice(avgPrice)} টাকা
            </p>
          </div>
        </div>

        <p className="mt-4 text-sm text-base-content/60">
          গতকাল {formatPrice(product.yesterday)} টাকা · গত সপ্তাহ{" "}
          {formatPrice(product.lastWeek)} টাকা · গত মাস{" "}
          {formatPrice(product.lastMonth)} টাকা
        </p>
      </section>

      {/* market wise price */}
      <section className="mt-8 rounded-xl border border-base-300 bg-white p-5 sm:p-8">
        <h2 className="text-2xl font-bold">বাজারভিত্তিক আজকের দাম</h2>
        <p className="mb-5 mt-1 text-sm text-base-content/60">
          বিভিন্ন বিভাগের বাজারের দাম (টাকা / {unit})
        </p>
        <MarketTable markets={product.markets} />
      </section>
    </main>
  );
}
