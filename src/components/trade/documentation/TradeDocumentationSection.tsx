import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileCheck, FileWarning, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface TradeDocumentationProps {
  productId: string;
  vendorId: string;
}

export const TradeDocumentationSection = ({ productId, vendorId }: TradeDocumentationProps) => {
  const { data: documents, isLoading } = useQuery({
    queryKey: ['trade-documents', productId],
    queryFn: async () => {
      console.log('Fetching trade documents for product:', productId);
      
      // This would fetch from a trade_documents table we'll create later
      const { data, error } = await supabase
        .from('trade_documents')
        .select('*')
        .eq('product_id', productId);

      if (error) throw error;
      return data;
    }
  });

  if (isLoading) {
    return <div>Loading documentation...</div>;
  }

  const requiredDocs = [
    {
      name: "Certificate of Origin",
      status: "verified",
      lastUpdated: "2024-01-15",
      type: "compliance"
    },
    {
      name: "Quality Certification",
      status: "pending",
      lastUpdated: "2024-01-10",
      type: "quality"
    },
    {
      name: "Export License",
      status: "verified",
      lastUpdated: "2024-01-05",
      type: "legal"
    }
  ];

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileCheck className="h-5 w-5" />
          Trade Documentation & Compliance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {requiredDocs.map((doc) => (
            <div key={doc.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                {doc.status === 'verified' ? (
                  <FileCheck className="h-5 w-5 text-green-500" />
                ) : (
                  <FileWarning className="h-5 w-5 text-yellow-500" />
                )}
                <div>
                  <h4 className="font-medium">{doc.name}</h4>
                  <p className="text-sm text-gray-500">Last updated: {doc.lastUpdated}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge 
                  variant={doc.status === 'verified' ? 'default' : 'secondary'}
                >
                  {doc.status}
                </Badge>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  View
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-700">Compliance Information</h4>
          <ul className="mt-2 space-y-2 text-sm text-blue-600">
            <li>• All products comply with African Continental Free Trade Area (AfCFTA) regulations</li>
            <li>• Documentation verified by authorized trade bodies</li>
            <li>• Regular compliance audits conducted</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};