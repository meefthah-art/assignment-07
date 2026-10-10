import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-16">
      <div className="rounded-xl border border-base-300 bg-white p-10 text-center">
        <div className="text-6xl">🔍</div>
        <h1 className="mt-4 text-5xl font-bold text-primary">৪০৪</h1>
        <h2 className="mt-3 text-xl font-bold">পেজটি খুঁজে পাওয়া যায়নি</h2>
        <p className="mt-2 text-base-content/60">
          আপনি যে পেজটি খুঁজছেন সেটি নেই বা সরিয়ে নেওয়া হয়েছে।
        </p>
        <Link href="/" className="btn btn-primary mt-6">
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
}
