interface SkeletonProps {
  className?: string;
}

export default function Skeleton({
  className = "",
}: SkeletonProps) {
  return (
    <div
      className={`animate-pulse rounded-xl bg-gray-200 dark:bg-white/10 ${className}`}
    />
  );
}