"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ArrowLeft, Loader2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function UpdateForm({ currentName }: { currentName: string }) {
  const router = useRouter();
  const [name, setName] = useState(currentName);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (name.trim().length < 2) {
      toast.error("নাম কমপক্ষে ২ অক্ষরের হতে হবে");
      return;
    }

    setLoading(true);
    const { error } = await authClient.updateUser({ name: name.trim() });
    setLoading(false);

    if (error) {
      toast.error(error.message || "তথ্য আপডেট করা যায়নি");
      return;
    }

    toast.success("নাম সফলভাবে আপডেট হয়েছে");
    router.push("/profile");
    router.refresh();
  }

  return (
    <main className="mx-auto max-w-lg px-4 py-10">
      <Link
        href="/profile"
        className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-primary"
      >
        <ArrowLeft size={16} /> প্রোফাইলে ফিরে যান
      </Link>

      <div className="rounded-xl border border-base-300 bg-white p-6 sm:p-8">
        <h1 className="text-2xl font-bold">তথ্য আপডেট করুন</h1>
        <p className="mb-6 mt-1 text-sm text-base-content/60">
          আপনার প্রোফাইলের নাম পরিবর্তন করুন।
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="mb-1 block text-sm font-medium">নাম</span>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered w-full bg-white"
            />
          </label>

          <button type="submit" disabled={loading} className="btn btn-primary w-full">
            {loading && <Loader2 size={18} className="animate-spin" />}
            আপডেট তথ্য
          </button>
        </form>
      </div>
    </main>
  );
}
