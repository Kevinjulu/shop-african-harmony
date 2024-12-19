import { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useAuthState = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    console.log("useAuthState: Initializing");
    let mounted = true;

    const initializeAuth = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error("Error getting session:", sessionError);
          setError(sessionError);
          toast.error("Authentication error: " + sessionError.message);
          return;
        }

        console.log("Initial session check:", session?.user?.email);
        
        if (mounted && session?.user) {
          setUser(session.user);
          
          const { data: adminData, error: adminError } = await supabase
            .from('admin_profiles')
            .select('is_admin')
            .eq('id', session.user.id)
            .maybeSingle();

          if (adminError) {
            console.error("Error checking admin status:", adminError);
            setError(adminError);
          }

          if (adminData?.is_admin) {
            console.log("Admin user detected");
          }
        }
        
        if (mounted) {
          setLoading(false);
        }
      } catch (error) {
        console.error("Error checking session:", error);
        if (mounted) {
          setError(error instanceof Error ? error : new Error('Unknown authentication error'));
          setLoading(false);
          toast.error("Error checking authentication status");
        }
      }
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session?.user?.email);
      
      if (mounted) {
        if (session?.user) {
          setUser(session.user);
        } else {
          setUser(null);
        }
        setLoading(false);
        setError(null);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return { user, loading, error };
};