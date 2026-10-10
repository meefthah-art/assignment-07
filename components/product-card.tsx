import Link from "next/link";
import type { Product } from "@/lib/api";
import { formatPrice, unitBn } from "@/lib/helpers";
import ChangeBadge from "./change-badge";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={"/product/" + product.slug}
      className="flex gap-4 rounded-xl border border-base-300 bg-white p-4 transition hover:-translate-y-0.5 hover:border-primary hover:shadow-md"
    >
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-base-200 text-3xl">
        {product.image}
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="truncate text-lg font-bold">{product.nameBn}</h3>
        <p className="text-sm text-base-content/60">প্রতি {unitBn(product.unit)}</p>

        <div className="mt-3 flex items-end justify-between gap-2">
          <div>
            <p className="text-xs text-base-content/60">আজকের দাম</p>
            <p className="text-lg font-bold">{formatPrice(product.today)} টাকা</p>
          </div>
          <ChangeBadge change={product.change} />
        </div>
      </div>
    </Link>
  );
}
