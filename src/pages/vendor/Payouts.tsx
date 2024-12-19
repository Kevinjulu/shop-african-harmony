import { PayoutManagement } from "@/components/vendor/payouts/PayoutManagement";

const VendorPayouts = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Payout Management</h1>
      <PayoutManagement />
    </div>
  );
};

export default VendorPayouts;