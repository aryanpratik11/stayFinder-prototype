import { useState } from "react";
import {
  FaFilter,
  FaSearch,
  FaRupeeSign,
  FaMapMarkerAlt
} from "react-icons/fa";

export default function ListingsFilter({ onFilter }) {
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [minRent, setMinRent] = useState("");
  const [maxRent, setMaxRent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter({ category, city, state, minRent, maxRent });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex flex-col sm:flex-row items-end gap-3 p-4 bg-black">
        <div className="flex-1 w-full flex flex-wrap gap-3">
          {/* Category Filter */}
          <div className="relative flex-1 min-w-[150px]">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full pl-3 pr-8 py-2 bg-gray-900 border border-gray-700 rounded-lg appearance-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="">All Categories</option>
              <option value="Apartment">Apartment</option>
              <option value="House">House</option>
              <option value="Villa">Villa</option>
              <option value="Hotels">Hotels</option>
              <option value="PG & Hostel">PG & Hostel</option>
              <option value="Shops">Shops</option>
              <option value="Industrial">Industrial</option>
            </select>
            <FaFilter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          {/* City Filter */}
          <div className="relative flex-1 min-w-[150px]">
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full pl-3 pr-8 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <FaMapMarkerAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          {/* State Filter */}
          <div className="relative flex-1 min-w-[150px]">
            <input
              type="text"
              placeholder="State"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full pl-3 pr-8 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <FaMapMarkerAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          {/* Rent Range */}
          <div className="flex items-center gap-2 min-w-[250px]">
            <div className="relative flex-1">
              <input
                type="number"
                placeholder="Min Rent"
                value={minRent}
                onChange={(e) => setMinRent(e.target.value)}
                className="w-full pl-8 pr-3 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <FaRupeeSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
            </div>
            <div className="relative flex-1">
              <input
                type="number"
                placeholder="Max Rent"
                value={maxRent}
                onChange={(e) => setMaxRent(e.target.value)}
                className="w-full pl-8 pr-3 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <FaRupeeSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors whitespace-nowrap"
        >
          <FaSearch />
          Apply Filters
        </button>
      </div>
    </form>
  );
}
