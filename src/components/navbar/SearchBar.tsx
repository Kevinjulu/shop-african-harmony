import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
}

export const SearchBar = ({ searchQuery, onSearchChange, onSearchSubmit }: SearchBarProps) => {
  return (
    <div className="hidden md:flex flex-1 max-w-3xl mx-8">
      <div className="flex w-full">
        <select 
          className="h-full py-2 pl-4 pr-8 bg-white border-r rounded-l-md focus:outline-none text-sm"
          defaultValue="all"
        >
          <option value="all">All</option>
          <option value="products">Products</option>
          <option value="vendors">Vendors</option>
        </select>
        <form onSubmit={onSearchSubmit} className="flex-1 flex">
          <Input
            type="text"
            placeholder="I'm shopping for..."
            className="w-full rounded-none border-0 focus-visible:ring-0"
            value={searchQuery}
            onChange={onSearchChange}
          />
          <Button 
            type="submit" 
            className="rounded-l-none bg-black hover:bg-black/90 text-white"
          >
            Search
          </Button>
        </form>
      </div>
    </div>
  );
};