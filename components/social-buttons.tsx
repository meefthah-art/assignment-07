"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Github, Loader2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#EA4335"
        d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.6 5.9c4.4-4.1 7-10.1 7-17.6z"
      />
      <path
        fill="#FBBC05"
        d="M10.5 28.7c-.5-1.5-.8-3.1-.8-4.7s.3-3.2.8-4.7l-7.9-6.1C.9 16.4 0 20.1 0 24s.9 7.6 2.6 10.8l7.9-6.1z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.3 0 11.6-2.1 15.5-5.7l-7.6-5.9c-2.1 1.4-4.8 2.3-7.9 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z"
      />
    </svg>
  );
}

// google and github login buttons, used in signin and signup pages
export default function SocialButtons({ next }: { next: string }) {
  const [loading, setLoading] = useState("");

  async function handleSocial(provider: "google" | "github") {
    setLoading(provider);

    const { error } = await authClient.signIn.social({
      provider: provider,
      callbackURL: next,
    });

    // if it works the browser goes to google/github, so we only handle error here
    if (error) {
      toast.error(error.message || "লগইন করা যায়নি, আবার চেষ্টা করুন");
      setLoading("");
    }
  }

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={() => handleSocial("google")}
        disabled={loading !== ""}
        className="btn btn-outline w-full border-base-300 bg-white"
      >
        {loading === "google" ? (
          <Loader2 size={18} className="animate-spin" />
        ) : (
          <GoogleIcon />
        )}
        Google দিয়ে চালিয়ে যান
      </button>

      <button
        type="button"
        onClick={() => handleSocial("github")}
        disabled={loading !== ""}
        className="btn btn-outline w-full border-base-300 bg-white"
      >
        {loading === "github" ? (
          <Loader2 size={18} className="animate-spin" />
        ) : (
          <Github size={18} />
        )}
        GitHub দিয়ে চালিয়ে যান
      </button>
    </div>
  );
}
