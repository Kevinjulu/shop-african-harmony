import { Link } from "react-router-dom";
import { User, ChevronDown, LogOut } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const UserMenu = () => {
  const { user, signOut } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center space-x-2 hover:text-black/80 focus:outline-none">
        <User className="h-6 w-6" />
        <span>{user ? 'Account' : 'Sign In'}</span>
        <ChevronDown className="h-4 w-4 opacity-50" />
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-56 bg-white border border-gray-200 shadow-lg rounded-md p-1"
      >
        {user ? (
          <>
            <DropdownMenuItem asChild>
              <Link 
                to="/account" 
                className="w-full flex items-center px-3 py-2 text-sm rounded-sm hover:bg-gray-100 cursor-pointer"
              >
                My Account
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link 
                to="/account/orders" 
                className="w-full flex items-center px-3 py-2 text-sm rounded-sm hover:bg-gray-100 cursor-pointer"
              >
                Orders
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link 
                to="/wishlist" 
                className="w-full flex items-center px-3 py-2 text-sm rounded-sm hover:bg-gray-100 cursor-pointer"
              >
                Wishlist
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={signOut}
              className="w-full flex items-center px-3 py-2 text-sm rounded-sm hover:bg-gray-100 cursor-pointer text-red-600 hover:text-red-700"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem asChild>
              <Link 
                to="/auth" 
                className="w-full flex items-center px-3 py-2 text-sm rounded-sm hover:bg-gray-100 cursor-pointer"
              >
                Sign In
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link 
                to="/auth?tab=sign-up" 
                className="w-full flex items-center px-3 py-2 text-sm rounded-sm hover:bg-gray-100 cursor-pointer"
              >
                Register
              </Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};