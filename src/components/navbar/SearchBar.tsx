import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/search/SearchInput";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
}

export const SearchBar = ({ searchQuery, onSearchChange, onSearchSubmit }: SearchBarProps) => {
  const handleSearch = () => {
    onSearchSubmit(new Event('submit') as unknown as React.FormEvent);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

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
        <div className="flex-1 flex">
          <SearchInput
            value={searchQuery}
            onChange={handleChange}
            onSearch={handleSearch}
            placeholder="I'm shopping for..."
            className="rounded-none border-0 focus-visible:ring-0"
          />
          <Button 
            type="submit" 
            className="rounded-l-none bg-black hover:bg-black/90 text-white"
            onClick={handleSearch}
          >
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};