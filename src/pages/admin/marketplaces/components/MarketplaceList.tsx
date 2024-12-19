import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Marketplace } from "../types";

interface MarketplaceListProps {
  marketplaces: Marketplace[];
  onEdit: (marketplace: Marketplace) => void;
  onDelete: (id: string) => void;
}

export const MarketplaceList = ({
  marketplaces,
  onEdit,
  onDelete,
}: MarketplaceListProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Marketplaces</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {marketplaces?.map((marketplace) => (
            <div
              key={marketplace.id}
              className="p-4 border rounded-lg space-y-2"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{marketplace.name}</h3>
                  <p className="text-sm text-gray-500">
                    {marketplace.location}, {marketplace.country}
                  </p>
                  <p className="text-sm text-gray-500">
                    Schedule: {marketplace.schedule}
                  </p>
                  {marketplace.next_market_date && (
                    <p className="text-sm text-gray-500">
                      Next Market:{" "}
                      {format(new Date(marketplace.next_market_date), "PPP")}
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(marketplace)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onDelete(marketplace.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};