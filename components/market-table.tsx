"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import type { Market } from "@/lib/api";
import { formatPrice } from "@/lib/helpers";

export default function MarketTable({ markets }: { markets: Market[] }) {
  const [division, setDivision] = useState("সব");
  const [search, setSearch] = useState("");

  // division names without repeat
  const divisions = ["সব"];
  markets.forEach((m) => {
    if (!divisions.includes(m.division)) {
      divisions.push(m.division);
    }
  });

  const rows = markets.filter((m) => {
    const divisionOk = division === "সব" || m.division === division;
    const searchOk = m.market.includes(search.trim());
    return divisionOk && searchOk;
  });

  return (
    <div>
      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {divisions.map((d) => (
            <button
              key={d}
              onClick={() => setDivision(d)}
              className={
                "rounded-full px-3 py-1 text-sm font-medium transition " +
                (division === d
                  ? "bg-primary text-primary-content"
                  : "bg-base-200 hover:bg-base-300")
              }
            >
              {d}
            </button>
          ))}
        </div>

        <label className="input input-bordered flex w-full items-center gap-2 bg-white lg:w-64">
          <Search size={16} />
          <input
            type="text"
            placeholder="বাজার খুঁজুন"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
      </div>

      <div className="overflow-x-auto rounded-xl border border-base-300">
        <table className="table min-w-[560px]">
          <thead className="bg-base-200 text-sm">
            <tr>
              <th>বাজার</th>
              <th>বিভাগ</th>
              <th>সর্বনিম্ন</th>
              <th>সর্বোচ্চ</th>
              <th>গড়</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-base-content/60">
                  কোনো বাজার পাওয়া যায়নি
                </td>
              </tr>
            ) : (
              rows.map((m, i) => (
                <tr key={i}>
                  <td className="font-medium">{m.market}</td>
                  <td>{m.division}</td>
                  <td>{formatPrice(m.min)} টাকা</td>
                  <td>{formatPrice(m.max)} টাকা</td>
                  <td className="font-bold text-primary">
                    {formatPrice(Math.round((m.min + m.max) / 2))} টাকা
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
