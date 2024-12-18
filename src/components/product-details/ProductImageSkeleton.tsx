import { Skeleton } from "@/components/ui/skeleton";

export const ProductImageSkeleton = () => {
  return (
    <div className="space-y-4">
      <Skeleton className="aspect-square w-full rounded-lg" />
      <div className="grid grid-cols-4 gap-2">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="aspect-square w-full rounded-md" />
        ))}
      </div>
    </div>
  );
};