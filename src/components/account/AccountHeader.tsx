import { useNavigate } from "react-router-dom";
import { UserRole } from "@/hooks/useUserRole";

interface AccountHeaderProps {
  role: UserRole;
}

export const AccountHeader = ({ role }: AccountHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-2xl md:text-3xl font-bold">My Account</h1>
      {role !== 'customer' && (
        <div className="space-x-2">
          {role === 'admin' && (
            <button
              onClick={() => navigate('/admin')}
              className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
            >
              Admin Dashboard
            </button>
          )}
          {role === 'vendor' && (
            <button
              onClick={() => navigate('/vendor')}
              className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
            >
              Vendor Dashboard
            </button>
          )}
        </div>
      )}
    </div>
  );
};