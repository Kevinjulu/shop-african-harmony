import { LoadingSpinner } from "@/components/LoadingSpinner";

export const LoadingFallback = () => {
  console.log("Showing loading fallback");
  
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <LoadingSpinner />
      <span className="ml-2 text-lg">Loading...</span>
    </div>
  );
};