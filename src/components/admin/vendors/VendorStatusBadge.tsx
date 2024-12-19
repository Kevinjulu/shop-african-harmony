import { Badge } from "@/components/ui/badge";

interface VendorStatusBadgeProps {
  status: "active" | "pending" | "suspended";
}

export const VendorStatusBadge = ({ status }: VendorStatusBadgeProps) => {
  return (
    <Badge
      variant={
        status === "active"
          ? "default"
          : status === "pending"
          ? "secondary"
          : "destructive"
      }
    >
      {status}
    </Badge>
  );
};