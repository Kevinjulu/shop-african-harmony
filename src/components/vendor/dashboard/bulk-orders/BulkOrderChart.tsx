import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Loader2 } from "lucide-react";
import { useBulkOrderChartData } from "./useBulkOrderChartData";

export const BulkOrderChart = () => {
  const { data: chartData, isLoading } = useBulkOrderChartData();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-72">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!chartData?.length) return null;

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Bulk Order Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" orientation="left" stroke="#82ca9d" />
              <YAxis yAxisId="right" orientation="right" stroke="#8884d8" />
              <Tooltip />
              <Bar yAxisId="left" dataKey="orders" fill="#82ca9d" name="Orders" />
              <Bar yAxisId="right" dataKey="revenue" fill="#8884d8" name="Revenue" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};