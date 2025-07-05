import { useState, useEffect, useContext } from "react";
import { authDataContext } from "../context/authContext.jsx";
import { Link } from "react-router-dom";
import { FaCalendarAlt, FaMapMarkerAlt, FaTimes } from "react-icons/fa";

export default function MyBookings() {
    const { serverUrl } = useContext(authDataContext);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cancellingId, setCancellingId] = useState(null);

    const fetchBookings = async () => {
        try {
            const res = await fetch(`${serverUrl}/api/bookings/my-bookings`, {
                credentials: "include",
            });
            const data = await res.json();
            if (res.ok) setBookings(data);
            else alert(data.message);
        } catch (err) {
            console.error(err);
            alert("Error fetching bookings");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const cancelBooking = async (id) => {
        if (!window.confirm("Are you sure you want to cancel this booking?")) return;
        setCancellingId(id);
        try {
            const res = await fetch(`${serverUrl}/api/bookings/cancel/${id}`, {
                method: "PUT",
                credentials: "include",
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message);
            alert("Booking cancelled successfully");
            fetchBookings();
        } catch (err) {
            console.error(err);
            alert(err.message || "Error cancelling booking");
        } finally {
            setCancellingId(null);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black p-8 text-center text-gray-400">
                Loading your bookings...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">My Bookings</h2>

                {bookings.length === 0 ? (
                    <div className="bg-gray-800/50 rounded-lg p-8 text-center">
                        <p className="text-gray-400 mb-4">You don't have any bookings yet.</p>
                        <Link
                            to="/listings"
                            className="inline-block px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
                        >
                            Browse Available Listings
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {bookings.map((booking) => (
                            <div key={booking._id} className="bg-gray-800/50 rounded-lg overflow-hidden border border-gray-700 hover:border-gray-600 transition-colors">
                                <div className="relative">
                                    <img
                                        src={booking.listing.images[0] || "https://via.placeholder.com/400x300?text=No+Image"}
                                        alt={booking.listing.title}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className={`absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-medium ${
                                        booking.status === 'cancelled' ? 'bg-red-900 text-red-100' : 
                                        booking.status === 'completed' ? 'bg-green-900 text-green-100' : 
                                        'bg-indigo-900 text-indigo-100'
                                    }`}>
                                        {booking.status.toUpperCase()}
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-white mb-2">{booking.listing.title}</h3>
                                    <div className="flex items-center text-gray-400 mb-3">
                                        <FaMapMarkerAlt className="mr-2" />
                                        <span>{booking.listing.location}</span>
                                    </div>

                                    <div className="space-y-2 text-sm mb-4">
                                        <div className="flex items-center text-gray-300">
                                            <FaCalendarAlt className="mr-2 text-indigo-400" />
                                            <span>
                                                {new Date(booking.checkin).toLocaleDateString()} - {new Date(booking.checkout).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <div className="text-gray-300">
                                            ₹ {booking.cost.toLocaleString()}
                                        </div>
                                    </div>

                                    {booking.status === "booked" && (
                                        <button
                                            onClick={() => cancelBooking(booking._id)}
                                            disabled={cancellingId === booking._id}
                                            className="w-full flex items-center justify-center py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded transition-colors disabled:opacity-70"
                                        >
                                            {cancellingId === booking._id ? (
                                                "Cancelling..."
                                            ) : (
                                                <>
                                                    <FaTimes className="mr-2" />
                                                    Cancel Booking
                                                </>
                                            )}
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}