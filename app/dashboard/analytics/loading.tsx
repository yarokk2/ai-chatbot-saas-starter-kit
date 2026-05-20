import Skeleton from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="space-y-8 p-8">
      {/* Header */}
      <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-white/5">
        <Skeleton className="h-10 w-64 mb-4" />
        <Skeleton className="h-4 w-96" />
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5"
          >
            <Skeleton className="h-8 w-8 mb-4" />
            <Skeleton className="h-4 w-24 mb-3" />
            <Skeleton className="h-10 w-32" />
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-white/5">
        <Skeleton className="h-8 w-48 mb-6" />
        <Skeleton className="h-80 w-full rounded-2xl" />
      </div>
    </div>
  );
}