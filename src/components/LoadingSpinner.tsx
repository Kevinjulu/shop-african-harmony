import { Loader2 } from "lucide-react";

export const LoadingSpinner = () => {
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
    </div>
  );
};