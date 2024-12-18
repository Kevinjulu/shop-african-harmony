import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface ProductAnalyticsProps {
  productId: string;
}

export const ProductAnalytics = ({ productId }: ProductAnalyticsProps) => {
  const { data: analyticsData, isLoading } = useQuery({
    queryKey: ['product-analytics', productId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('analytics')
        .select('*')
        .eq('product_id', productId)
        .order('date', { ascending: true });

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <div>Loading analytics...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Product Performance</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={analyticsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="views" stroke="#8884d8" name="Views" />
              <Line type="monotone" dataKey="sales" stroke="#82ca9d" name="Sales" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analyticsData?.reduce((sum: number, item: any) => sum + (item.views || 0), 0)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analyticsData?.reduce((sum: number, item: any) => sum + (item.sales || 0), 0)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {((analyticsData?.reduce((sum: number, item: any) => sum + (item.sales || 0), 0) /
                analyticsData?.reduce((sum: number, item: any) => sum + (item.views || 0), 0)) *
                100).toFixed(2)}%
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};