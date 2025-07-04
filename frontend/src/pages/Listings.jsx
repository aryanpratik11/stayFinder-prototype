import { useContext, useEffect } from "react";
import { listingDataContext } from "../context/listingContext";
import { authDataContext } from "../context/authContext";
import ListCard from "../components/ListCard";

export default function Listings() {
  const { listings, loading, error, fetchListings, removeListing } = useContext(listingDataContext);
  const { serverUrl, user } = useContext(authDataContext);

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
          <ListCard
            key={listing._id}
            listing={listing}
            currentUser={user}
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
                removeListing(listing._id);
              } catch (err) {
                console.error(err);
                alert(err.message || "Failed to delete listing.");
              }
            }}
          />
        ))}
      </div>
    </div>
  );
}
