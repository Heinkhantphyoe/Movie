import React from 'react'
import { SearchIcon } from 'lucide-react'

const SearchComponent = ({ search, setSearch }) => (
  <div className="w-full max-w-2xl mb-8">
    <div className="flex items-center bg-gray-800 rounded-lg focus-within:ring-2 focus-within:ring-blue-500">
      <div className="pl-3 flex items-center">
        <SearchIcon className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        className="w-full p-3 bg-transparent text-white focus:outline-none placeholder-gray-400"
        placeholder="Search for moviessss..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
    </div>
  </div>
);

export default SearchComponent;