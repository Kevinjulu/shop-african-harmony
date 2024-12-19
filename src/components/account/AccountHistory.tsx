import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const AccountHistory = () => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Browsing History</CardTitle>
        <CardDescription>Recently viewed items</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-muted-foreground">No items in history.</p>
          <Button variant="outline" onClick={() => navigate('/products')}>
            Explore Products
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};