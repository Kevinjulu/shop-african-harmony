import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const SearchBar = ({ searchQuery, setSearchQuery, onSubmit }: SearchBarProps) => {
  return (
    <form onSubmit={onSubmit} className="hidden md:block flex-1 max-w-xl mx-8">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search for African crafts..."
          className="w-full pl-10 pr-4 py-2 border-primary/20 focus:border-primary"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      </div>
    </form>
  );
};