import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Search, Filter } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ProductFiltersProps {
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

export const ProductFilters = ({
  onSearchChange,
  onCategoryChange,
  onStatusChange,
}: ProductFiltersProps) => {
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data;
    },
  });

  return (
    <Card className="p-4 mb-6 bg-white shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <Filter className="w-4 h-4 text-gray-500" />
        <h3 className="text-sm font-medium">Filters</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search products..."
            className="pl-10 bg-white border-gray-200"
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        
        <Select onValueChange={onCategoryChange}>
          <SelectTrigger className="bg-white border-gray-200">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories?.map((category) => (
              <SelectItem key={category.id} value={category.name || category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={onStatusChange}>
          <SelectTrigger className="bg-white border-gray-200">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="out_of_stock">Out of Stock</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </Card>
  );
};