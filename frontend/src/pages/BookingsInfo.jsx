import { useEffect, useState, useContext } from "react";
import { authDataContext } from "../context/authContext";
import { FaCalendarAlt, FaMapMarkerAlt, FaUser, FaRupeeSign, FaInfoCircle } from "react-icons/fa";

export default function BookingsInfo() {
    const { serverUrl } = useContext(authDataContext);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchBookingsInfo() {
            try {
                const res = await fetch(`${serverUrl}/api/bookings/bookings-info`, {
                    credentials: "include",
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.message || "Failed to fetch bookings");
                setBookings(data);
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchBookingsInfo();
    }, [serverUrl]);

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="animate-pulse text-center space-y-4">
                    <div className="h-8 w-64 bg-gray-800/50 rounded mx-auto"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="bg-gray-800 rounded-lg p-4 h-64"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center p-6 bg-gray-800/50 rounded-lg max-w-md">
                    <FaInfoCircle className="text-red-500 text-4xl mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">Error Loading Bookings</h3>
                    <p className="text-gray-400 mb-4">{error}</p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    if (bookings.length === 0) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center p-6 bg-gray-800/50 rounded-lg max-w-md">
                    <h3 className="text-xl font-semibold text-white mb-2">No Bookings Received</h3>
                    <p className="text-gray-400 mb-4">You haven't received any bookings yet.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Bookings Received</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {bookings.map((booking) => (
                        <div key={booking._id} className="bg-gray-800/50 rounded-lg overflow-hidden border border-gray-700 hover:border-gray-600 transition-colors">
                            <div className="relative">
                                {booking.listing?.images?.[0] ? (
                                    <img
                                        src={booking.listing.images[0]}
                                        alt={booking.listing.title}
                                        className="w-full h-48 object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-48 bg-gray-700 flex items-center justify-center text-gray-500">
                                        No Image Available
                                    </div>
                                )}
                                <div className={`absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-medium ${
                                    booking.status === "cancelled" ? "bg-red-900 text-red-100" :
                                    booking.status === "completed" ? "bg-green-900 text-green-100" :
                                    "bg-indigo-900 text-indigo-100"
                                }`}>
                                    {booking.status.toUpperCase()}
                                </div>
                            </div>
                            
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-white mb-2">{booking.listing?.title || "Untitled Listing"}</h3>
                                
                                <div className="flex items-center text-gray-400 mb-3">
                                    <FaMapMarkerAlt className="mr-2" />
                                    <span>{booking.listing?.location || "Location not specified"}</span>
                                </div>
                                
                                <div className="flex items-center text-gray-300 mb-3">
                                    <FaUser className="mr-2" />
                                    <div>
                                        <p className="text-sm">{booking.client?.name || "Guest"}</p>
                                        <p className="text-xs text-gray-500">{booking.client?.email}</p>
                                    </div>
                                </div>
                                
                                <div className="flex justify-between items-center mb-3">
                                    <div className="flex items-center text-gray-300">
                                        <FaCalendarAlt className="mr-2 text-indigo-400" />
                                        <span className="text-sm">
                                            {new Date(booking.checkin).toLocaleDateString()} - {new Date(booking.checkout).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <div className="flex items-center text-white font-medium">
                                        <FaRupeeSign className="mr-1" />
                                        {booking.cost.toLocaleString()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}