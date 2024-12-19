import { useState, useEffect } from "react";
import { Search, MapPin, Star, Phone, Mail, Clock, TrendingUp, Award } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { toast } from "sonner";

interface Store {
  id: string;
  business_name: string;
  description: string;
  logo_url: string;
  business_category: string;
  contact_email: string;
  contact_phone: string;
  business_address: string;
  verification_status: string;
  created_at: string;
}

const StoreList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const { data: stores, isLoading } = useQuery({
    queryKey: ["stores", category],
    queryFn: async () => {
      console.log("Fetching stores with category:", category);
      let query = supabase
        .from("vendor_profiles")
        .select("*")
        .eq("verification_status", "verified");

      if (category !== "all") {
        query = query.eq("business_category", category);
      }

      const { data, error } = await query;
      
      if (error) {
        console.error("Error fetching stores:", error);
        toast.error("Failed to load stores");
        throw error;
      }

      return data as Store[];
    },
  });

  const categories = [
    "All Categories",
    "Fashion & Clothing",
    "Art & Crafts",
    "Jewelry & Accessories",
    "Home & Living",
    "Food & Beverages",
    "Beauty & Personal Care",
  ];

  const filteredStores = stores?.filter(store => 
    store.business_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    store.description?.toLowerCase().includes(searchQuery.toLowerCase())
  ) ?? [];

  const sortedStores = [...(filteredStores || [])].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      case "oldest":
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      case "name_asc":
        return a.business_name.localeCompare(b.business_name);
      case "name_desc":
        return b.business_name.localeCompare(a.business_name);
      default:
        return 0;
    }
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Discover African Brands</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore our curated collection of authentic African brands and artisans. 
          Each store brings unique products and stories from across the continent.
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search stores by name or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem 
                key={cat.toLowerCase().replace(/ & /g, '_')} 
                value={cat.toLowerCase().replace(/ & /g, '_')}
              >
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="name_asc">Name (A-Z)</SelectItem>
            <SelectItem value="name_desc">Name (Z-A)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="overflow-hidden">
              <CardContent className="p-0">
                <Skeleton className="h-48 w-full" />
                <div className="p-4">
                  <Skeleton className="h-6 w-2/3 mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedStores.map((store) => (
              <Link key={store.id} to={`/store/${store.id}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
                  <CardContent className="p-0">
                    <div className="relative h-48">
                      <img
                        src={store.logo_url || "/placeholder.svg"}
                        alt={store.business_name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <Badge 
                        className="absolute top-2 right-2 bg-green-500"
                        variant="secondary"
                      >
                        Verified
                      </Badge>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                          {store.business_name}
                        </h3>
                        <Award className="w-5 h-5 text-primary" />
                      </div>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {store.description}
                      </p>
                      <div className="space-y-2 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span className="line-clamp-1">{store.business_address}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          <span className="line-clamp-1">{store.contact_email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          <span>{store.contact_phone}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {sortedStores.length === 0 && (
            <div className="text-center py-12">
              <TrendingUp className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500 mb-4">No stores found matching your criteria</p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery("");
                  setCategory("all");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default StoreList;