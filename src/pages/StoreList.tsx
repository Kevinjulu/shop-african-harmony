import { useState } from "react";
import { Search, MapPin, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const StoreList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");

  // Mock data - in a real app, this would come from an API
  const stores = [
    {
      id: 1,
      name: "African Artisan Collective",
      description: "Handcrafted jewelry and accessories from East Africa",
      rating: 4.8,
      location: "Nairobi, Kenya",
      image: "/placeholder.svg",
      category: "Jewelry",
    },
    {
      id: 2,
      name: "West African Textiles",
      description: "Traditional and modern African fabric designs",
      rating: 4.6,
      location: "Lagos, Nigeria",
      image: "/placeholder.svg",
      category: "Textiles",
    },
    {
      id: 3,
      name: "Sahara Crafts",
      description: "Authentic North African pottery and ceramics",
      rating: 4.7,
      location: "Marrakech, Morocco",
      image: "/placeholder.svg",
      category: "Pottery",
    },
    // Add more stores as needed
  ];

  const categories = [
    "All Categories",
    "Jewelry",
    "Textiles",
    "Pottery",
    "Art",
    "Fashion",
    "Home Decor",
  ];

  const filteredStores = stores.filter(store => 
    store.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (category === "all" || store.category.toLowerCase() === category.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Stores</h1>
      
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search stores..."
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
              <SelectItem key={cat.toLowerCase()} value={cat.toLowerCase()}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStores.map((store) => (
          <div key={store.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={store.image}
              alt={store.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{store.name}</h3>
              <p className="text-gray-600 mb-4">{store.description}</p>
              <div className="flex items-center gap-2 text-gray-500 mb-2">
                <MapPin className="w-4 h-4" />
                <span>{store.location}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500 mb-4">
                <Star className="w-4 h-4 text-yellow-400" />
                <span>{store.rating} / 5.0</span>
              </div>
              <Button className="w-full">Visit Store</Button>
            </div>
          </div>
        ))}
      </div>

      {filteredStores.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No stores found matching your criteria</p>
        </div>
      )}
    </div>
  );
};

export default StoreList;