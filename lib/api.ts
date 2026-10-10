// API base url (BASE_URL_2 from the assignment)
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.abcz.workers.dev/api/bazardor";

export type Market = {
  market: string;
  division: string;
  min: number;
  max: number;
};

export type Product = {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string; // emoji
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: { dir: "up" | "down" | "flat"; pct: number };
  markets: Market[];
};

export type Category = {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
};

// used if the categories api does not work
export const defaultCategories: Category[] = [
  { id: "chal", slug: "chal", nameBn: "চাল", icon: "🍚" },
  { id: "dal", slug: "dal", nameBn: "ডাল", icon: "🫘" },
  { id: "tel", slug: "tel", nameBn: "তেল", icon: "🛢️" },
  { id: "sobji", slug: "sobji", nameBn: "সবজি", icon: "🥬" },
  { id: "mach", slug: "mach", nameBn: "মাছ", icon: "🐟" },
  { id: "mangsho", slug: "mangsho", nameBn: "মাংস", icon: "🍗" },
  { id: "dim-dui", slug: "dim-dui", nameBn: "ডিম-দুধ", icon: "🥛" },
  { id: "mosla", slug: "mosla", nameBn: "মসলা", icon: "🌶️" },
];

export async function getProducts(category?: string): Promise<Product[]> {
  let url = API_URL + "/products";
  if (category) {
    url = url + "?category=" + category;
  }

  const res = await fetch(url, { next: { revalidate: 300 } });
  if (!res.ok) {
    throw new Error("Products could not be loaded");
  }

  const data = await res.json();
  if (Array.isArray(data)) {
    return data;
  }
  return [];
}

export async function getCategories(): Promise<Category[]> {
  try {
    const res = await fetch(API_URL + "/categories", {
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      return defaultCategories;
    }
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) {
      return data;
    }
    return defaultCategories;
  } catch (error) {
    return defaultCategories;
  }
}
