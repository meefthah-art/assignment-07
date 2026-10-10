// grey loading cards, shown while data is loading
export default function ProductSkeleton({ count = 6 }: { count?: number }) {
  const items = Array.from({ length: count }, (_, i) => i);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((i) => (
        <div
          key={i}
          className="flex gap-4 rounded-xl border border-base-300 bg-white p-4"
        >
          <div className="skeleton h-14 w-14 shrink-0"></div>
          <div className="flex-1 space-y-2">
            <div className="skeleton h-5 w-3/4"></div>
            <div className="skeleton h-4 w-1/3"></div>
            <div className="skeleton mt-3 h-6 w-full"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
