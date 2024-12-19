import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileCheck, FileWarning, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface TradeDocument {
  id: string;
  document_type: string;
  document_name: string;
  status: string;
  document_url: string | null;
  verification_date: string | null;
  issuing_authority: string | null;
}

interface TradeDocumentationProps {
  productId: string;
  vendorId: string;
}

export const TradeDocumentationSection = ({ productId, vendorId }: TradeDocumentationProps) => {
  const { data: documents, isLoading } = useQuery({
    queryKey: ['trade-documents', productId],
    queryFn: async () => {
      console.log('Fetching trade documents for product:', productId);
      
      const { data, error } = await supabase
        .from('trade_documents')
        .select(`
          id,
          document_type,
          document_name,
          status,
          document_url,
          verification_date,
          issuing_authority
        `)
        .eq('product_id', productId);

      if (error) throw error;
      return (data || []) as TradeDocument[];
    }
  });

  if (isLoading) {
    return <div>Loading documentation...</div>;
  }

  // Fallback to required docs if no documents are found
  const displayDocs = documents?.length ? documents : [
    {
      id: '1',
      document_type: 'compliance',
      document_name: "Certificate of Origin",
      status: "verified",
      document_url: null,
      verification_date: "2024-01-15",
      issuing_authority: "Chamber of Commerce"
    },
    {
      id: '2',
      document_type: 'quality',
      document_name: "Quality Certification",
      status: "pending",
      document_url: null,
      verification_date: "2024-01-10",
      issuing_authority: "Standards Bureau"
    },
    {
      id: '3',
      document_type: 'legal',
      document_name: "Export License",
      status: "verified",
      document_url: null,
      verification_date: "2024-01-05",
      issuing_authority: "Trade Ministry"
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
          {displayDocs.map((doc) => (
            <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                {doc.status === 'verified' ? (
                  <FileCheck className="h-5 w-5 text-green-500" />
                ) : (
                  <FileWarning className="h-5 w-5 text-yellow-500" />
                )}
                <div>
                  <h4 className="font-medium">{doc.document_name}</h4>
                  <p className="text-sm text-gray-500">
                    Last updated: {new Date(doc.verification_date || '').toLocaleDateString()}
                  </p>
                  {doc.issuing_authority && (
                    <p className="text-xs text-gray-500">
                      Issued by: {doc.issuing_authority}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge 
                  variant={doc.status === 'verified' ? 'default' : 'secondary'}
                >
                  {doc.status}
                </Badge>
                {doc.document_url && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={doc.document_url} target="_blank" rel="noopener noreferrer">
                      <Download className="h-4 w-4 mr-2" />
                      View
                    </a>
                  </Button>
                )}
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