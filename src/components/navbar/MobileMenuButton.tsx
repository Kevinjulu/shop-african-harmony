import { AlignJustify } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileMenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export const MobileMenuButton = ({ onClick }: MobileMenuButtonProps) => {
  return (
    <div className="md:hidden flex items-center h-14 -ml-4">
      <Button 
        variant="ghost" 
        onClick={onClick}
        className="p-2 hover:bg-[#FDB813]/20 transition-colors rounded-full"
      >
        <AlignJustify className="h-7 w-7 text-black" />
      </Button>
    </div>
  );
};