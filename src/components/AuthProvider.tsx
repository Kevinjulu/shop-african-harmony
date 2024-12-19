import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
  const location = useLocation();

  useEffect(() => {
    console.log("AuthProvider: Initializing");
    let mounted = true;

    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        console.log("Initial session check:", session?.user?.email);
        
        if (mounted) {
          if (session?.user) {
            setUser(session.user);
            
            // Check if user is admin
            const { data: adminData } = await supabase
              .from('admin_profiles')
              .select('is_admin')
              .eq('id', session.user.id)
              .maybeSingle();

            if (adminData?.is_admin) {
              console.log("Admin user detected, redirecting to admin");
              navigate('/admin');
            } else if (location.pathname === '/auth') {
              // Only redirect to account if we're on the auth page
              navigate('/account');
            }
          }
          setLoading(false);
        }
      } catch (error) {
        console.error("Error checking session:", error);
        if (mounted) {
          setLoading(false);
          toast.error("Error checking authentication status");
        }
      }
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session?.user?.email);
      
      if (mounted) {
        if (event === 'SIGNED_IN') {
          console.log("User signed in:", session?.user?.email);
          setUser(session?.user ?? null);
          
          if (session?.user) {
            const { data: adminData } = await supabase
              .from('admin_profiles')
              .select('is_admin')
              .eq('id', session.user.id)
              .maybeSingle();

            if (adminData?.is_admin) {
              navigate('/admin');
            } else {
              // Only redirect to account if we're on the auth page
              if (location.pathname === '/auth') {
                navigate('/account');
              }
            }
          }
          
          toast.success("Signed in successfully!");
        } else if (event === 'SIGNED_OUT') {
          console.log("User signed out");
          setUser(null);
          navigate('/');
          toast.success("Signed out successfully");
        } else if (event === 'TOKEN_REFRESHED') {
          console.log("Token refreshed");
          setUser(session?.user ?? null);
        }
        
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [navigate, location.pathname]);

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Error signing out. Please try again.');
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};