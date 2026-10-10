export default function Loading() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="skeleton mb-5 h-5 w-56"></div>
      <div className="rounded-xl border border-base-300 bg-white p-8">
        <div className="flex items-center gap-5">
          <div className="skeleton h-24 w-24"></div>
          <div className="flex-1 space-y-3">
            <div className="skeleton h-8 w-1/3"></div>
            <div className="skeleton h-4 w-2/3"></div>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="skeleton h-20"></div>
          <div className="skeleton h-20"></div>
          <div className="skeleton h-20"></div>
        </div>
      </div>
      <div className="skeleton mt-8 h-72"></div>
    </main>
  );
}
