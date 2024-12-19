import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthProvider";

export type UserRole = 'admin' | 'vendor' | 'customer';

interface UseUserRoleReturn {
  role: UserRole;
  loading: boolean;
  error: Error | null;
}

export const useUserRole = (): UseUserRoleReturn => {
  const { user } = useAuth();
  const [role, setRole] = useState<UserRole>('customer');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const checkUserRole = async () => {
      try {
        if (!user) {
          setRole('customer');
          setLoading(false);
          return;
        }

        // Check if user is admin
        const { data: adminData, error: adminError } = await supabase
          .from('admin_profiles')
          .select('is_admin')
          .eq('id', user.id)
          .single();

        if (adminError) {
          throw adminError;
        }

        if (adminData?.is_admin) {
          setRole('admin');
          setLoading(false);
          return;
        }

        // Check if user is vendor
        const { data: vendorData, error: vendorError } = await supabase
          .from('vendor_profiles')
          .select('id')
          .eq('user_id', user.id)
          .single();

        if (vendorError && vendorError.code !== 'PGRST116') {
          throw vendorError;
        }

        if (vendorData) {
          setRole('vendor');
        } else {
          setRole('customer');
        }
      } catch (err) {
        console.error('Error checking user role:', err);
        setError(err instanceof Error ? err : new Error('Failed to check user role'));
      } finally {
        setLoading(false);
      }
    };

    checkUserRole();
  }, [user]);

  return { role, loading, error };
};