import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";

interface SearchBarProps {
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
  onSubmit?: (e: React.FormEvent) => void;
}

export const SearchBar = ({ searchQuery: externalSearchQuery, setSearchQuery: externalSetSearchQuery, onSubmit: externalOnSubmit }: SearchBarProps = {}) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [internalSearchQuery, setInternalSearchQuery] = useState(searchParams.get('search') || '');

  useEffect(() => {
    setInternalSearchQuery(searchParams.get('search') || '');
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (externalOnSubmit) {
      externalOnSubmit(e);
      return;
    }
    
    if (internalSearchQuery.trim()) {
      console.log('Searching for:', internalSearchQuery);
      navigate(`/products?search=${encodeURIComponent(internalSearchQuery.trim())}`);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (externalSetSearchQuery) {
      externalSetSearchQuery(value);
    } else {
      setInternalSearchQuery(value);
    }
  };

  return (
    <form onSubmit={handleSearch} className="hidden md:block flex-1 max-w-xl mx-8">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search for African products..."
          className="w-full pl-10 pr-4 py-2 border-primary/20 focus:border-primary"
          value={externalSearchQuery || internalSearchQuery}
          onChange={handleSearchChange}
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      </div>
    </form>
  );
};