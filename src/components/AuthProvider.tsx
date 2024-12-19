import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";
import { toast } from "sonner";

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
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("AuthProvider: Initializing");
    // Check active sessions and sets the user
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        console.log("Initial session check:", session?.user?.email);
        
        if (session?.user) {
          setUser(session.user);
          // Check if user is admin and redirect accordingly
          const { data: adminData } = await supabase
            .from('admin_profiles')
            .select('is_admin')
            .eq('id', session.user.id)
            .single();

          if (adminData?.is_admin) {
            navigate('/admin');
          }
        }
      } catch (error) {
        console.error("Error checking session:", error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Listen for changes on auth state (logged in, signed out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session?.user?.email);
      
      if (event === 'PASSWORD_RECOVERY') {
        console.log("Password recovery event detected");
        toast.info("Please enter your new password below");
        navigate('/auth/reset-password');
      } else if (event === 'SIGNED_IN') {
        console.log("User signed in:", session?.user?.email);
        setUser(session?.user ?? null);
        
        // Check if user is admin
        if (session?.user) {
          const { data: adminData } = await supabase
            .from('admin_profiles')
            .select('is_admin')
            .eq('id', session.user.id)
            .single();

          if (adminData?.is_admin) {
            navigate('/admin');
          } else {
            navigate('/account');
          }
        }
        
        toast.success("Signed in successfully!");
      } else if (event === 'SIGNED_OUT') {
        console.log("User signed out");
        setUser(null);
        navigate('/');
        toast.success("Signed out successfully");
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Error signing out');
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};