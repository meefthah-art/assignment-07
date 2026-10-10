"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { LogOut, User, ChevronDown } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import type { Category } from "@/lib/api";
import TodayDate from "./today-date";

export default function Header({ categories }: { categories: Category[] }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  async function handleSignOut() {
    await authClient.signOut();
    toast.success("সফলভাবে সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  }

  const user = session?.user;
  const firstLetter = user?.name ? user.name.charAt(0).toUpperCase() : "U";

  return (
    <header className="border-b border-base-300 bg-white">
      <div className="mx-auto max-w-6xl px-4">
        {/* first row: logo and buttons */}
        <div className="flex items-center justify-between py-3">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-2xl">
              🛒
            </span>
            <span>
              <span className="block text-xl font-bold leading-tight text-primary">
                বাজার দর
              </span>
              <span className="block text-xs text-base-content/60">
                <TodayDate />
              </span>
            </span>
          </Link>

          <div className="flex items-center gap-2">
            {isPending ? (
              <div className="skeleton h-10 w-28"></div>
            ) : user ? (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="flex cursor-pointer items-center gap-2 rounded-full border border-base-300 py-1 pl-1 pr-3 hover:bg-base-200"
                >
                  {user.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={user.image}
                      alt="profile"
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  ) : (
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-content">
                      {firstLetter}
                    </span>
                  )}
                  <span className="hidden max-w-[110px] truncate text-sm font-medium sm:block">
                    {user.name}
                  </span>
                  <ChevronDown size={16} />
                </div>

                <ul
                  tabIndex={0}
                  className="dropdown-content menu z-50 mt-2 w-64 rounded-xl border border-base-300 bg-white p-2 shadow-lg"
                >
                  <li className="px-3 py-2">
                    <div className="pointer-events-none flex flex-col items-start gap-0">
                      <span className="font-bold">{user.name}</span>
                      <span className="text-xs text-base-content/60">
                        {user.email}
                      </span>
                    </div>
                  </li>
                  <li>
                    <Link href="/profile">
                      <User size={16} /> আমার প্রোফাইল
                    </Link>
                  </li>
                  <li>
                    <button onClick={handleSignOut} className="text-error">
                      <LogOut size={16} /> সাইন আউট
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <>
                <Link href="/signin" className="btn btn-ghost btn-sm sm:btn-md">
                  সাইন ইন
                </Link>
                <Link href="/signup" className="btn btn-primary btn-sm sm:btn-md">
                  সাইন আপ
                </Link>
              </>
            )}
          </div>
        </div>

        {/* second row: category links */}
        <nav className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-3">
          {categories.map((cat) => {
            const href = "/category/" + cat.slug;
            const active = pathname === href;

            return (
              <Link
                key={cat.id}
                href={href}
                className={
                  "flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition " +
                  (active
                    ? "bg-primary text-primary-content"
                    : "bg-base-200 hover:bg-base-300")
                }
              >
                <span>{cat.icon}</span>
                <span>{cat.nameBn}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
