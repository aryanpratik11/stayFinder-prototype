import { useContext, useEffect } from "react";
import { listingDataContext } from "../context/listingContext";
import { authDataContext } from "../context/authContext";
import { Link } from "react-router-dom";

export default function Listings() {
  const { listings, loading, error, fetchListings, removeListing } = useContext(listingDataContext);
  const { serverUrl, user, isAuthenticated } = useContext(authDataContext);

  useEffect(() => {
    fetchListings();
  }, []);

  if (loading) return <div className="p-4 text-center">Loading...</div>;
  if (error) return <div className="p-4 text-center text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-black text-gray-200 p-4">
      <h2 className="text-2xl font-bold mb-4">Listings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {listings.map((listing) => (
          <div key={listing._id} className="bg-gray-900 border border-gray-800 rounded-lg p-4">
            {listing.images[0] && (
              <img
                src={listing.images[0]}
                alt={listing.title}
                className="w-full h-48 object-cover rounded mb-2"
              />
            )}
            <h3 className="text-xl font-semibold">{listing.title}</h3>
            <p className="text-gray-400">{listing.location}</p>
            <p className="text-gray-300">₹ {listing.rent}</p>

            {/** ✅ Only show these buttons to the owner */}
            {isAuthenticated && user && listing.host._id === user._id && (
              <div className="flex justify-between items-center mt-2">
                <Link
                  to={`/edit-listing/${listing._id}`}
                  className="text-blue-400 hover:underline"
                >
                  Edit
                </Link>
                <button
                  onClick={async () => {
                    if (!window.confirm("Are you sure you want to delete this listing?")) return;
                    try {
                      const res = await fetch(`${serverUrl}/api/listings/delete/${listing._id}`, {
                        method: "DELETE",
                        credentials: "include",
                      });
                      const data = await res.json();
                      if (!res.ok) throw new Error(data.message);
                      alert("Listing deleted.");
                      removeListing(listing._id);
                    } catch (err) {
                      console.error(err);
                      alert(err.message || "Failed to delete listing.");
                    }
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
