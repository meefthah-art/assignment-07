const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

// 148 -> ১৪৮
export function toBn(value: number | string): string {
  return String(value).replace(/\d/g, (d) => bnDigits[Number(d)]);
}

// 1850 -> ১,৮৫০
export function formatPrice(n: number): string {
  return toBn(n.toLocaleString("en-US"));
}

// 2.1 -> ২.১
export function formatPct(pct: number): string {
  return toBn(Math.abs(pct).toFixed(1));
}

export function unitBn(unit: string): string {
  const units: Record<string, string> = {
    kg: "কেজি",
    litre: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
  };
  return units[unit] || unit;
}
