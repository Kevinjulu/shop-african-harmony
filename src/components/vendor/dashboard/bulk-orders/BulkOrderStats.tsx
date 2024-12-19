import { Card } from "@/components/ui/card";
import { useBulkOrderMetrics } from "./useBulkOrderMetrics";
import { StatCard } from "./StatCard";

export const BulkOrderStats = () => {
  const { metrics, isLoading } = useBulkOrderMetrics();

  if (isLoading) {
    return <div>Loading stats...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatCard
        title="Total Bulk Orders"
        value={metrics.totalOrders}
        description="Total number of bulk orders received"
      />
      <StatCard
        title="Average Order Value"
        value={metrics.averageOrderValue}
        description="Average value per bulk order"
        prefix="$"
      />
      <StatCard
        title="Conversion Rate"
        value={metrics.conversionRate}
        description="Bulk order conversion rate"
        suffix="%"
      />
    </div>
  );
};