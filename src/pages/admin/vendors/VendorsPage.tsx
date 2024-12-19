import { VendorTable } from "@/components/admin/VendorTable";
import { Card } from "@/components/ui/card";

const VendorsPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Vendor Management</h1>
      <Card className="p-6">
        <VendorTable />
      </Card>
    </div>
  );
};

export default VendorsPage;