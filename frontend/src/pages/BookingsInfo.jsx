import { useEffect, useState, useContext } from "react";
import { authDataContext } from "../context/authContext";

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
                if (!res.ok) throw new Error(data.message || "Failed to fetch.");
                setBookings(data);
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        console.log("Fetching bookings info from:", `${serverUrl}/api/bookings/bookings-info`);
        fetchBookingsInfo();
    }, []);

    if (loading) return <div className="p-4 text-center">Loading...</div>;
    if (error) return <div className="p-4 text-center text-red-500">{error}</div>;

    if (bookings.length === 0) {
        return <div className="p-4 text-center">No bookings received yet.</div>;
    }

    return (
        <div className="min-h-screen bg-black text-gray-200 p-4">
            <h2 className="text-2xl font-bold mb-4">Bookings Received</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {bookings.map((b) => (
                    <div key={b._id} className="bg-gray-900 border border-gray-800 rounded p-4">
                        {b.listing?.images?.[0] && (
                            <img
                                src={b.listing.images[0]}
                                alt={b.listing.title}
                                className="w-full h-48 object-cover rounded mb-2"
                            />
                        )}
                        <h3 className="text-xl font-semibold">{b.listing?.title}</h3>
                        <p className="text-gray-400">{b.listing?.location}</p>
                        <p className="text-sm text-gray-400">Client: {b.client?.name} ({b.client?.email})</p>
                        <p className="text-gray-300 mt-1">₹ {b.cost}</p>
                        <p className="text-sm text-gray-500 mt-1">
                            {new Date(b.checkin).toLocaleDateString()} - {new Date(b.checkout).toLocaleDateString()}
                        </p>
                        <p className={`mt-1 text-sm ${b.status === "cancelled" ? "text-red-500" : "text-green-500"}`}>
                            {b.status}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
