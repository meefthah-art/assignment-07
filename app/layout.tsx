import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Ticker from "@/components/ticker";
import Footer from "@/components/footer";
import AppToaster from "@/components/toaster";
import { getCategories } from "@/lib/api";

const hind = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "বাজার দর | BazarDor",
  description: "প্রয়োজনীয় পণ্যের দাম এক নজরে",
  icons: { icon: "/logo-icon.png" },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getCategories();

  return (
    <html lang="bn" data-theme="bazardor">
      <body className={hind.className}>
        <Header categories={categories} />
        <Ticker />
        <div className="min-h-[60vh]">{children}</div>
        <Footer />
        <AppToaster />
      </body>
    </html>
  );
}
