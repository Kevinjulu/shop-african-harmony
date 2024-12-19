import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";

export const LoadingFallback = () => (
  <div className="container mx-auto px-4 py-8">
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
      <p className="text-gray-600">Loading...</p>
    </div>
    <div className="space-y-4 mt-8">
      <Skeleton className="h-8 w-[200px]" />
      <Skeleton className="h-[300px] w-full" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Skeleton className="h-[200px]" />
        <Skeleton className="h-[200px]" />
        <Skeleton className="h-[200px]" />
      </div>
    </div>
  </div>
);