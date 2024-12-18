import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

export const EmptyOrderHistory = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center space-y-4">
      <p className="text-gray-600">You haven't placed any orders yet.</p>
      <Button onClick={() => navigate("/")} className="flex items-center gap-2">
        <ShoppingBag className="w-4 h-4" />
        Start Shopping
      </Button>
    </div>
  );
};