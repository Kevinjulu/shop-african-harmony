import { createContext, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";
import { toast } from "sonner";
import { useAuthState } from "@/hooks/useAuthState";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({ 
  user: null, 
  loading: true,
  signOut: async () => {} 
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuthState();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = async () => {
    try {
      console.log("Signing out user");
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate('/');
      toast.success("Signed out successfully");
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Error signing out. Please try again.');
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signOut: handleSignOut }}>
      {children}
    </AuthContext.Provider>
  );
};