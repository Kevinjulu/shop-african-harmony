import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { supabase } from "@/integrations/supabase/client";

interface VendorAnalyticsProps {
  vendorId: string;
}

export const VendorAnalyticsDashboard = ({ vendorId }: VendorAnalyticsProps) => {
  const { data: analytics, isLoading } = useQuery({
    queryKey: ['vendor-analytics', vendorId],
    queryFn: async () => {
      console.log('Fetching vendor analytics:', vendorId);
      const { data, error } = await supabase
        .from('analytics')
        .select('*')
        .eq('vendor_id', vendorId)
        .order('date', { ascending: true });

      if (error) throw error;
      return data;
    },
  });

  const { data: summary } = useQuery({
    queryKey: ['vendor-analytics-summary', vendorId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('vendor_analytics_summary')
        .select('*')
        .eq('vendor_id', vendorId)
        .single();

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <div>Loading analytics...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary?.total_orders || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${summary?.total_sales?.toFixed(2) || '0.00'}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary?.average_rating?.toFixed(1) || '0.0'}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Performance Overview</CardTitle>
        </CardHeader>
        <CardContent className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={analytics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="total_sales"
                stroke="#8884d8"
                name="Sales"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="page_views"
                stroke="#82ca9d"
                name="Page Views"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};