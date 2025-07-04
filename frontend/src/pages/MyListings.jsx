import { useEffect, useContext, useState } from "react";
import { listingDataContext } from "../context/listingContext";
import { authDataContext } from "../context/authContext";
import { Link } from "react-router-dom";

export default function MyListings() {
    const { listings, fetchListings, removeListing } = useContext(listingDataContext);
    const { user } = useContext(authDataContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            await fetchListings();
            setLoading(false);
        };
        load();
    }, []);

    if (loading) {
        return <div className="text-center text-gray-400 mt-8">Loading your listings...</div>;
    }

    const myListings = listings.filter((l) => l.host._id === user._id);

    return (
        <div className="max-w-5xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">My Listings</h2>
            {myListings.length === 0 ? (
                <p className="text-gray-400">You have no listings yet.</p>
            ) : (
                <div className="grid md:grid-cols-2 gap-4">
                    {myListings.map((listing) => (
                        <div key={listing._id} className="bg-gray-900 border border-gray-700 rounded p-4">
                            <img
                                src={listing.images[0]}
                                alt={listing.title}
                                className="w-full h-48 object-cover rounded mb-2"
                            />
                            <h3 className="text-lg font-semibold">{listing.title}</h3>
                            <p className="text-gray-400">{listing.location}</p>
                            <div className="flex space-x-2 mt-2">
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
                                            const res = await fetch(
                                                `${serverUrl}/api/listings/delete/${listing._id}`,
                                                {
                                                    method: "DELETE",
                                                    credentials: "include",
                                                }
                                            );
                                            const data = await res.json();
                                            if (!res.ok) throw new Error(data.message);
                                            alert("Listing deleted.");
                                            removeListing(listing._id);
                                        } catch (err) {
                                            console.error(err);
                                            alert(err.message || "Delete error");
                                        }
                                    }}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
