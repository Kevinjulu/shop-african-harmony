import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileMenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export const MobileMenuButton = ({ onClick }: MobileMenuButtonProps) => {
  return (
    <div className="md:hidden">
      <Button 
        variant="ghost" 
        onClick={onClick}
        className="p-2 hover:bg-[#FDB813]/20 transition-colors rounded-full"
      >
        <Menu className="h-6 w-6 text-black" />
      </Button>
    </div>
  );
};