import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

export const OrderHistoryHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold">Order History</h1>
      <Button onClick={() => navigate("/")} variant="outline" className="flex items-center gap-2">
        <ShoppingBag className="w-4 h-4" />
        Continue Shopping
      </Button>
    </div>
  );
};