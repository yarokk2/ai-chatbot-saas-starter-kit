import Skeleton from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="space-y-8 p-8">
      {/* Header */}
      <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-white/5">
        <Skeleton className="mb-4 h-10 w-64" />
        <Skeleton className="h-4 w-96 max-w-full" />
      </div>

      {/* Stats / Summary Cards */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5"
          >
            <Skeleton className="mb-4 h-8 w-8" />
            <Skeleton className="mb-3 h-4 w-24" />
            <Skeleton className="h-10 w-32" />
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-white/5">
        <Skeleton className="mb-6 h-8 w-48" />
        <Skeleton className="h-80 w-full rounded-2xl" />
      </div>
    </div>
  );
}