import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const AddressSection = ({ addresses }: { addresses: any[] }) => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Saved Addresses</CardTitle>
        <CardDescription>Your shipping addresses</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {addresses.length === 0 ? (
            <p className="text-muted-foreground">No addresses saved yet.</p>
          ) : (
            addresses.map((address: any) => (
              <div key={address.id} className="p-3 border rounded-lg">
                <p className="font-medium">{address.full_name}</p>
                <p>{address.address_line1}</p>
                <p>{address.city}, {address.state} {address.postal_code}</p>
              </div>
            ))
          )}
          <Button 
            onClick={() => navigate('/account/addresses/new')} 
            variant="outline" 
            className="w-full md:w-auto"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Address
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};