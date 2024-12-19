import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthProvider";

export type UserRole = 'admin' | 'vendor' | 'customer';

export const useUserRole = () => {
  const { user } = useAuth();
  const [role, setRole] = useState<UserRole>('customer');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserRole = async () => {
      if (!user) {
        setRole('customer');
        setLoading(false);
        return;
      }

      try {
        // Check if user is admin
        const { data: adminData } = await supabase
          .from('admin_profiles')
          .select('is_admin')
          .eq('id', user.id)
          .single();

        if (adminData?.is_admin) {
          setRole('admin');
          setLoading(false);
          return;
        }

        // Check if user is vendor
        const { data: vendorData } = await supabase
          .from('vendor_profiles')
          .select('id')
          .eq('user_id', user.id)
          .single();

        if (vendorData) {
          setRole('vendor');
        } else {
          setRole('customer');
        }
      } catch (error) {
        console.error('Error checking user role:', error);
        setRole('customer');
      } finally {
        setLoading(false);
      }
    };

    checkUserRole();
  }, [user]);

  return { role, loading };
};