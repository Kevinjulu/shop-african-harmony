import { Button } from "@/components/ui/button";
import { Check, Ban } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface VendorActionsProps {
  vendorId: string;
  currentStatus: string;
  onStatusChange: () => void;
}

export const VendorActions = ({ vendorId, currentStatus, onStatusChange }: VendorActionsProps) => {
  const handleStatusChange = async (newStatus: 'active' | 'suspended') => {
    try {
      const { error } = await supabase
        .from('vendor_profiles')
        .update({ status: newStatus })
        .eq('id', vendorId);

      if (error) throw error;

      toast.success(`Vendor ${newStatus === 'active' ? 'approved' : 'suspended'} successfully`);
      onStatusChange();
    } catch (error) {
      console.error('Error updating vendor status:', error);
      toast.error("Failed to update vendor status");
    }
  };

  return (
    <div className="flex space-x-2">
      {currentStatus !== 'active' && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleStatusChange('active')}
          className="text-green-600 hover:text-green-700"
        >
          <Check className="w-4 h-4" />
        </Button>
      )}
      {currentStatus !== 'suspended' && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleStatusChange('suspended')}
          className="text-red-600 hover:text-red-700"
        >
          <Ban className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
};