import Image from "next/image";
import { ArrowRight, TrendingUp, TrendingDown } from "lucide-react";
import { getProducts } from "@/lib/api";
import type { Product } from "@/lib/api";
import { toBn } from "@/lib/helpers";
import ProductCard from "@/components/product-card";
import TodayDate from "@/components/today-date";

export default async function HomePage() {
  let products: Product[] = [];
  let failed = false;

  try {
    products = await getProducts();
  } catch (error) {
    failed = true;
  }

  if (failed || products.length === 0) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-16">
        <div className="rounded-xl border border-base-300 bg-white p-10 text-center">
          <div className="text-5xl">⚠️</div>
          <h2 className="mt-3 text-xl font-bold">পণ্যের তথ্য পাওয়া যাচ্ছে না</h2>
          <p className="mt-2 text-base-content/60">
            কিছুক্ষণ পর আবার চেষ্টা করুন।
          </p>
        </div>
      </main>
    );
  }

  // top 6 price up and top 6 price down
  const risers = products
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallers = products
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  // numbers for the hero
  const categoryCount = new Set(products.map((p) => p.category)).size;
  const marketCount = new Set(
    products.flatMap((p) => p.markets.map((m) => m.market))
  ).size;

  return (
    <main>
      {/* hero */}
      <section className="border-b border-base-300 bg-base-200">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-10 md:grid-cols-2 md:py-14">
          <div>
            <p className="mb-4 inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              <TodayDate />
            </p>
            <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              আজকের বাজারের দাম <span className="text-primary">এক নজরে</span>
            </h1>
            <p className="mt-4 max-w-lg leading-7 text-base-content/70">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
              বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন এক জায়গায়।
            </p>

            <a href="#সব-পণ্য" className="btn btn-primary mt-6">
              সব পণ্য দেখুন <ArrowRight size={18} />
            </a>

            <div className="mt-8 flex gap-3">
              <div className="rounded-xl border border-base-300 bg-white px-4 py-3 text-center">
                <p className="text-xl font-bold text-primary">{toBn(products.length)}</p>
                <p className="text-xs text-base-content/60">পণ্য</p>
              </div>
              <div className="rounded-xl border border-base-300 bg-white px-4 py-3 text-center">
                <p className="text-xl font-bold text-primary">{toBn(categoryCount)}</p>
                <p className="text-xs text-base-content/60">ক্যাটাগরি</p>
              </div>
              <div className="rounded-xl border border-base-300 bg-white px-4 py-3 text-center">
                <p className="text-xl font-bold text-primary">{toBn(marketCount)}</p>
                <p className="text-xs text-base-content/60">বাজার</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <Image
              src="/bazar-hero.png"
              alt="বাজারের ঝুড়ি"
              width={420}
              height={350}
              priority
              className="h-auto w-full max-w-sm"
            />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4">
        {/* section A */}
        <section className="pt-10">
          <div className="mb-5 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-success/10 text-success">
              <TrendingUp size={20} />
            </span>
            <div>
              <h2 className="text-2xl font-bold">আজ দাম বেড়েছে ▲</h2>
              <p className="text-sm text-base-content/60">
                সবচেয়ে বেশি দাম বেড়েছে এমন ৬টি পণ্য
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {risers.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        {/* section B */}
        <section className="pt-10">
          <div className="mb-5 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-error/10 text-error">
              <TrendingDown size={20} />
            </span>
            <div>
              <h2 className="text-2xl font-bold">আজ দাম কমেছে ▼</h2>
              <p className="text-sm text-base-content/60">
                সবচেয়ে বেশি দাম কমেছে এমন ৬টি পণ্য
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {fallers.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        {/* section C */}
        <section id="সব-পণ্য" className="scroll-mt-4 pt-10">
          <h2 className="text-2xl font-bold">সব পণ্য</h2>
          <p className="mb-5 mt-1 text-sm text-base-content/60">
            আজকের বাজারে পাওয়া সব পণ্যের বর্তমান দাম
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
