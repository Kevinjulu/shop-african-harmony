import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthProvider";
import { ProfileSection } from "./ProfileSection";
import { AddressSection } from "./AddressSection";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { toast } from "sonner";
import type { Profile } from "@/types/auth";

interface Address {
  id: string;
  full_name: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  is_default: boolean;
}

export const AccountOverview = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!user) {
          console.log("AccountOverview: No user found, skipping data fetch");
          setLoading(false);
          return;
        }

        console.log("AccountOverview: Fetching user data", { userId: user.id });
        
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profileError) {
          console.error("AccountOverview: Profile fetch error", profileError);
          throw profileError;
        }

        console.log("AccountOverview: Profile data fetched", profileData);
        setProfile({ ...profileData, email: user.email });

        const { data: addressData, error: addressError } = await supabase
          .from('shipping_addresses')
          .select('*')
          .eq('user_id', user.id);

        if (addressError) {
          console.error("AccountOverview: Address fetch error", addressError);
          throw addressError;
        }

        console.log("AccountOverview: Address data fetched", { 
          count: addressData?.length 
        });
        setAddresses(addressData || []);
      } catch (error) {
        console.error("AccountOverview: Error fetching user data", error);
        setError('Failed to load user data. Please try again later.');
        toast.error('Error loading account data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="text-center p-4 bg-red-50 rounded-lg">
        <p className="text-red-600">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-2 text-sm text-red-600 hover:text-red-700 underline"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <ProfileSection profile={profile} />
      <AddressSection addresses={addresses} />
    </div>
  );
};