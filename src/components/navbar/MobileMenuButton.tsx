import { Menu, AlignJustify } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileMenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export const MobileMenuButton = ({ onClick }: MobileMenuButtonProps) => {
  return (
    <div className="md:hidden absolute left-4">
      <Button 
        variant="ghost" 
        onClick={onClick}
        className="p-2 hover:bg-[#FDB813]/20 transition-colors rounded-full"
      >
        <AlignJustify className="h-6 w-6 text-black" />
      </Button>
    </div>
  );
};