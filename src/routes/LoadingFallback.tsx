import { Loader2 } from "lucide-react";

export const LoadingFallback = () => {
  console.log("Showing loading fallback");
  
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <span className="ml-2 text-lg">Loading...</span>
    </div>
  );
};