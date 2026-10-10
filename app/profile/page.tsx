import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import SignOutButton from "@/components/signout-button";

export default async function ProfilePage() {
  let session = null;
  try {
    session = await auth.api.getSession({ headers: await headers() });
  } catch (error) {
    session = null;
  }

  if (!session) {
    redirect("/signin?reason=protected&next=/profile");
  }

  const user = session.user;
  const firstLetter = user.name ? user.name.charAt(0).toUpperCase() : "U";

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold">আমার প্রোফাইল</h1>
      <p className="mb-6 mt-1 text-sm text-base-content/60">
        আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
      </p>

      <section className="flex flex-col gap-4 rounded-xl border border-base-300 bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          {user.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user.image}
              alt="profile"
              className="h-16 w-16 rounded-full object-cover"
            />
          ) : (
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-content">
              {firstLetter}
            </span>
          )}
          <div>
            <p className="text-xl font-bold">{user.name}</p>
            <p className="text-sm text-base-content/60">{user.email}</p>
          </div>
        </div>
        <SignOutButton />
      </section>

      <section className="mt-6 rounded-xl border border-base-300 bg-white p-6">
        <h2 className="mb-4 text-lg font-bold">তথ্য</h2>

        <div className="space-y-3">
          <div className="flex justify-between gap-4 border-b border-base-300 pb-3">
            <span className="text-base-content/60">নাম</span>
            <span className="font-medium">{user.name}</span>
          </div>
          <div className="flex justify-between gap-4 border-b border-base-300 pb-3">
            <span className="text-base-content/60">ইমেইল</span>
            <span className="font-medium">{user.email}</span>
          </div>
        </div>

        <Link href="/profile/update" className="btn btn-primary mt-5">
          আপডেট
        </Link>
      </section>
    </main>
  );
}
