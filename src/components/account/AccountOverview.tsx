import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthProvider";
import { ProfileSection } from "./ProfileSection";
import { AddressSection } from "./AddressSection";
import { LoadingSpinner } from "@/components/LoadingSpinner";

export const AccountOverview = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!user) {
          setLoading(false);
          return;
        }

        console.log("Fetching user profile data for:", user.id);
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profileError) {
          console.error('Error fetching profile:', profileError);
          throw profileError;
        }

        console.log("Profile data fetched:", profileData);
        setProfile({ ...profileData, email: user.email });

        const { data: addressData, error: addressError } = await supabase
          .from('shipping_addresses')
          .select('*')
          .eq('user_id', user.id);

        if (addressError) {
          console.error('Error fetching addresses:', addressError);
          throw addressError;
        }

        console.log("Address data fetched:", addressData);
        setAddresses(addressData || []);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to load user data. Please try again later.');
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
      <div className="text-center text-red-600 p-4">
        {error}
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