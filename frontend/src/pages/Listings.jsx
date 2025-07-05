import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { listingDataContext } from "../context/listingContext";
import { authDataContext } from "../context/authContext";
import ListCard from "../components/ListCard";
import ListingsFilter from "../components/ListingsFilter";

export default function Listings() {
  const { loading, error, removeListing } = useContext(listingDataContext);
  const { serverUrl, user, isAuthenticated } = useContext(authDataContext);

  const [listings, setListings] = useState([]);
  const [filters, setFilters] = useState({});

  const fetchListings = async (filters = {}) => {
    try {
      let query = new URLSearchParams();
      for (let key in filters) {
        if (filters[key]) query.append(key, filters[key]);
      }

      const res = await fetch(`${serverUrl}/api/listings?${query.toString()}`);
      const data = await res.json();
      setListings(data);
    } catch (err) {
      console.error("Fetch listings error:", err);
    }
  };

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const filterObj = {};
    if (params.get("category")) filterObj.category = params.get("category");
    if (params.get("city")) filterObj.city = params.get("city");
    if (params.get("state")) filterObj.state = params.get("state");
    if (params.get("minRent")) filterObj.minRent = params.get("minRent");
    if (params.get("maxRent")) filterObj.maxRent = params.get("maxRent");

    fetchListings(filterObj);
  }, [location.search]);


  const handleFilter = (newFilters) => {
    setFilters(newFilters);
    fetchListings(newFilters);
  };

  if (loading) return <div className="p-4 text-center">Loading...</div>;
  if (error) return <div className="p-4 text-center text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-black text-gray-200 p-4">
      <ListingsFilter onFilter={handleFilter} />

      {listings.length === 0 ? (
        <div className="p-4 text-center">No listings found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {listings.map((listing) => (
            <ListCard
              key={listing._id}
              listing={listing}
              showBookButton={!(isAuthenticated && user && listing.host._id === user._id)}
              showEditDelete={isAuthenticated && user && listing.host._id === user._id}
              onDelete={async () => {
                if (!window.confirm("Are you sure you want to delete this listing?")) return;
                try {
                  const res = await fetch(`${serverUrl}/api/listings/delete/${listing._id}`, {
                    method: "DELETE",
                    credentials: "include",
                  });
                  const data = await res.json();
                  if (!res.ok) throw new Error(data.message);
                  alert("Listing deleted.");
                  setListings(listings.filter((l) => l._id !== listing._id));
                } catch (err) {
                  console.error(err);
                  alert(err.message || "Failed to delete listing.");
                }
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
