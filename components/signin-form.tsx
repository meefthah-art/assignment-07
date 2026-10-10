"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import SocialButtons from "./social-buttons";

export default function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  
  let next = searchParams.get("next") || "/";
  if (!next.startsWith("/") || next.startsWith("//")) {
    next = "/";
  }

  useEffect(() => {
    if (searchParams.get("reason") === "protected") {
      toast.error("বিস্তারিত দেখতে আগে সাইন ইন করুন");
    }
  }, [searchParams]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
      return;
    }

    setLoading(true);
    const { error } = await authClient.signIn.email({ email, password });
    setLoading(false);

    if (error) {
         toast.error(error.message || "সাইন ইন করা যায়নি");
      return;
    }

    toast.success("সফলভাবে সাইন ইন হয়েছে");
    router.push(next);
    router.refresh();
  }

  return (
    <main className="mx-auto flex max-w-6xl justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-xl border border-base-300 bg-white p-6 sm:p-8">
        <h1 className="text-3xl font-bold">সাইন ইন</h1>
        <p className="mb-6 mt-2 text-sm text-base-content/60">
          বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="mb-1 block text-sm font-medium">ইমেইল</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="imteeazz@gmail.com"
              className="input input-bordered w-full bg-white"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-medium">পাসওয়ার্ড</span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="কমপক্ষে ৮ অক্ষর"
              className="input input-bordered w-full bg-white"
            />
          </label>

          <button type="submit" disabled={loading} className="btn btn-primary w-full">
            {loading && <Loader2 size={18} className="animate-spin" />}
            সাইন ইন
          </button>
        </form>

        <div className="divider my-5 text-xs text-base-content/60">অথবা</div>

        <SocialButtons next={next} />

        <p className="mt-6 text-center text-sm">
          অ্যাকাউন্ট নেই?{" "}
          <Link href="/signup" className="font-bold text-primary">
            সাইন আপ করুন
          </Link>
        </p>
      </div>
    </main>
  );
}
