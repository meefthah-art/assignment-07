"use client";

import { useState } from "react";
import Link from "next/link";
import type { Category, Product } from "@/lib/api";
import { toBn } from "@/lib/helpers";
import ProductCard from "./product-card";

export default function CategoryList({
  category,
  products,
}: {
  category: Category;
  products: Product[];
}) {
  const [sort, setSort] = useState("default");

  // sort by the real number (not by the bangla text)
  const list = [...products];
  if (sort === "low") {
    list.sort((a, b) => a.today - b.today);
  } else if (sort === "high") {
    list.sort((a, b) => b.today - a.today);
  }

  // nothing in this category
  if (products.length === 0) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-16">
        <div className="rounded-xl border border-base-300 bg-white p-10 text-center">
          <div className="text-5xl">🔍</div>
          <h2 className="mt-3 text-xl font-bold">কোনো পণ্য পাওয়া যায়নি</h2>
          <p className="mt-2 text-base-content/60">
            এই ক্যাটাগরিতে এখন কোনো পণ্য নেই।
          </p>
          <Link href="/" className="btn btn-primary mt-6">
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-base-200 text-3xl">
            {category.icon}
          </span>
          <div>
            <h1 className="text-3xl font-bold">{category.nameBn}</h1>
            <p className="text-sm text-base-content/60">
              {toBn(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </div>

        <label className="flex items-center gap-2">
          <span className="text-sm font-medium">সাজান</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="select select-bordered w-52 bg-white"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low">দাম: কম থেকে বেশি</option>
            <option value="high">দাম: বেশি থেকে কম</option>
          </select>
        </label>
      </div>

      <p className="mb-4 text-sm text-base-content/60">
        মোট {toBn(list.length)}টি পণ্য দেখানো হচ্ছে
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </main>
  );
}
