import { getProducts } from "@/lib/api";
import type { Product } from "@/lib/api";
import { formatPct, formatPrice, unitBn } from "@/lib/helpers";

// moving price strip under the navbar
export default async function Ticker() {
  let products: Product[] = [];
  try {
    products = await getProducts();
  } catch (error) {
    return null;
  }

  if (products.length === 0) {
    return null;
  }

  // the list is printed 2 times so the animation can loop without a gap
  const twice = [0, 1];

  return (
    <div className="ticker overflow-hidden border-b border-base-300 bg-base-200">
      <div className="ticker-track flex w-max">
        {twice.map((n) => (
          <div key={n} className="flex shrink-0" aria-hidden={n === 1}>
            {products.map((p) => {
              let color = "text-base-content/60";
              let arrow = "—";
              if (p.change.dir === "up") {
                color = "text-success";
                arrow = "▲";
              } else if (p.change.dir === "down") {
                color = "text-error";
                arrow = "▼";
              }

              return (
                <span
                  key={p.id}
                  className="flex items-center gap-2 whitespace-nowrap px-5 py-2 text-sm"
                >
                  <span>{p.image}</span>
                  <span className="font-semibold">{p.nameBn}</span>
                  <span>
                    {formatPrice(p.today)} টাকা/{unitBn(p.unit)}
                  </span>
                  <span className={"font-bold " + color}>
                    {arrow} {formatPct(p.change.pct)}%
                  </span>
                </span>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
