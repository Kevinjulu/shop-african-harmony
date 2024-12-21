import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Stores = () => {
  const { data: stores, isLoading } = useQuery({
    queryKey: ["stores"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("vendor_profiles")
        .select("*")
        .eq("status", "active")
        .order("business_name");

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <div>Loading stores...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Our Stores</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stores?.map((store) => (
          <div key={store.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              {store.logo_url && (
                <img
                  src={store.logo_url}
                  alt={store.business_name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
              )}
              <div>
                <h2 className="text-xl font-semibold">{store.business_name}</h2>
                <p className="text-gray-600">{store.business_category}</p>
              </div>
            </div>
            {store.description && (
              <p className="text-gray-700 mb-4">{store.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stores;