import { useEffect, useContext, useState } from "react";
import { listingDataContext } from "../context/listingContext";
import { authDataContext } from "../context/authContext";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaPlus, FaHome, FaMapMarkerAlt, FaRupeeSign } from "react-icons/fa";

export default function MyListings() {
    const { listings, fetchListings, removeListing } = useContext(listingDataContext);
    const { user, serverUrl } = useContext(authDataContext);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState(null);

    useEffect(() => {
        const load = async () => {
            await fetchListings();
            setLoading(false);
        };
        load();
    }, [fetchListings]);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this listing?")) return;
        
        setDeletingId(id);
        try {
            const res = await fetch(
                `${serverUrl}/api/listings/delete/${id}`,
                {
                    method: "DELETE",
                    credentials: "include",
                }
            );
            const data = await res.json();
            if (!res.ok) throw new Error(data.message);
            removeListing(id);
        } catch (err) {
            console.error(err);
            alert(err.message || "Delete error");
        } finally {
            setDeletingId(null);
        }
    };

    const myListings = listings.filter((l) => l.host._id === user._id);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 p-8">
                <div className="max-w-6xl mx-auto">
                    <div className="animate-pulse space-y-6">
                        <div className="h-8 w-64 bg-gray-800 rounded"></div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="bg-gray-800/50 rounded-xl overflow-hidden">
                                    <div className="h-48 bg-gray-700"></div>
                                    <div className="p-4 space-y-3">
                                        <div className="h-5 w-3/4 bg-gray-700 rounded"></div>
                                        <div className="h-4 w-1/2 bg-gray-700 rounded"></div>
                                        <div className="flex gap-3 pt-2">
                                            <div className="h-8 w-16 bg-gray-700 rounded"></div>
                                            <div className="h-8 w-16 bg-gray-700 rounded"></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center">
                        <FaHome className="mr-3 text-indigo-400" />
                        My Listings
                    </h2>
                    <Link
                        to="/listings/create"
                        className="flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
                    >
                        <FaPlus className="mr-2" />
                        Add New
                    </Link>
                </div>

                {myListings.length === 0 ? (
                    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8 text-center">
                        <p className="text-gray-400 mb-4">You haven't created any listings yet.</p>
                        <Link
                            to="/create-listing"
                            className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
                        >
                            <FaPlus className="mr-2" />
                            Create Your First Listing
                        </Link>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {myListings.map((listing) => (
                            <div key={listing._id} className="bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                <div className="relative">
                                    <img
                                        src={listing.images[0] || "https://via.placeholder.com/400x300?text=No+Image"}
                                        alt={listing.title}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="absolute top-2 right-2 bg-gray-900/80 text-white px-2 py-1 rounded-full text-sm flex items-center">
                                        <FaRupeeSign className="mr-1" />
                                        {listing.rent?.toLocaleString()}
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-white mb-1 truncate">{listing.title}</h3>
                                    <div className="flex items-center text-gray-400 mb-3">
                                        <FaMapMarkerAlt className="mr-1 text-sm" />
                                        <span className="truncate">{listing.location}</span>
                                    </div>
                                    <div className="flex justify-between pt-2 border-t border-gray-700">
                                        <Link
                                            to={`/edit-listing/${listing._id}`}
                                            className="flex items-center px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                                        >
                                            <FaEdit className="mr-2" />
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(listing._id)}
                                            disabled={deletingId === listing._id}
                                            className="flex items-center px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-70"
                                        >
                                            {deletingId === listing._id ? (
                                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                            ) : (
                                                <FaTrash className="mr-2" />
                                            )}
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}