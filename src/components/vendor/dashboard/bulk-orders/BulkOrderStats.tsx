import { Loader2 } from "lucide-react";
import { StatCard } from "./StatCard";
import { useBulkOrderMetrics } from "./useBulkOrderMetrics";

export const BulkOrderStats = () => {
  const { data: metrics, isLoading } = useBulkOrderMetrics();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!metrics) return null;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Bulk Orders"
        value={metrics.total_bulk_orders}
        subtitle="Last 30 days"
      />
      <StatCard
        title="Bulk Revenue"
        value={`$${metrics.total_bulk_revenue.toFixed(2)}`}
        subtitle="Last 30 days"
      />
      <StatCard
        title="Average Order Size"
        value={`$${metrics.average_order_size.toFixed(2)}`}
        subtitle="Per bulk order"
      />
      <StatCard
        title="Largest Order"
        value={`$${metrics.largest_order.toFixed(2)}`}
        subtitle="Highest value"
      />
    </div>
  );
};