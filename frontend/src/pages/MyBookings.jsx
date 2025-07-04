import { useState, useEffect, useContext } from "react";
import { authDataContext } from "../context/authContext.jsx";

export default function MyBookings() {
    const { serverUrl } = useContext(authDataContext);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

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
        if (!window.confirm("Cancel this booking?")) return;
        try {
            const res = await fetch(`${serverUrl}/api/bookings/cancel/${id}`, {
                method: "PUT",
                credentials: "include",
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message);
            alert("Booking cancelled.");
            fetchBookings();
        } catch (err) {
            console.error(err);
            alert(err.message || "Error cancelling booking");
        }
    };

    if (loading) return <div className="p-4">Loading...</div>;

    return (
        <div className="min-h-screen bg-black text-gray-200 p-4">
            <h2 className="text-2xl font-bold mb-4">My Bookings</h2>
            {bookings.length === 0 && <p>No bookings yet.</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {bookings.map((b) => (
                    <div key={b._id} className="bg-gray-900 p-4 rounded border border-gray-800">
                        <img
                            src={b.listing.images[0]}
                            alt={b.listing.title}
                            className="w-full h-40 object-cover rounded mb-2"
                        />
                        <h3 className="text-xl font-semibold">{b.listing.title}</h3>
                        <p>{b.listing.location}</p>
                        <p>Check-in: {new Date(b.checkin).toLocaleDateString()}</p>
                        <p>Check-out: {new Date(b.checkout).toLocaleDateString()}</p>
                        <p>Status: {b.status}</p>
                        <p>Total Cost: ₹ {b.cost}</p>
                        {b.status === "booked" && (
                            <button
                                onClick={() => cancelBooking(b._id)}
                                className="mt-2 text-red-500 hover:text-red-700"
                            >
                                Cancel Booking
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
