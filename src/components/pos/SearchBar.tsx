import React from 'react';
import { Search, Barcode } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

interface SearchBarProps {
  onSearch: (term: string) => void;
  searchTerm: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, searchTerm }) => {
  return (
    <Card className="p-1.5 bg-white shadow-sm border-gray-100 flex items-center h-full hover:shadow-md transition-shadow">
      <div className="relative flex-1 flex items-center h-full">
        <Search className="absolute left-4 w-5 h-5 text-gray-400" />
        <Input 
          type="text" 
          placeholder="Search by product name, category or scan barcode..." 
          className="w-full pl-12 pr-12 h-full text-base font-medium border-none shadow-none focus-visible:ring-0 bg-transparent"
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
          autoFocus
        />
        <div className="absolute right-2 p-2 bg-gray-50 rounded-md border border-gray-200 cursor-pointer hover:bg-blue-50 transition-colors">
          <Barcode className="w-5 h-5 text-blue-600" />
        </div>
      </div>
    </Card>
  );
};
