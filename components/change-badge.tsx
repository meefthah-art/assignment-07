import { formatPct } from "@/lib/helpers";
import type { Product } from "@/lib/api";

export default function ChangeBadge({ change }: { change: Product["change"] }) {
  let color = "bg-base-200 text-base-content/60";
  let arrow = "—";

  if (change.dir === "up") {
    color = "bg-success/10 text-success";
    arrow = "▲";
  } else if (change.dir === "down") {
    color = "bg-error/10 text-error";
    arrow = "▼";
  }

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${color}`}
    >
      {arrow} {formatPct(change.pct)}%
    </span>
  );
}
