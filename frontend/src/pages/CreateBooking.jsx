import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { authDataContext } from "../context/authContext";

export default function CreateBooking() {
    const { serverUrl } = useContext(authDataContext);
    const navigate = useNavigate();
    const { listingId } = useParams();

    const [listing, setListing] = useState(null);
    const [checkin, setCheckin] = useState("");
    const [checkout, setCheckout] = useState("");
    const [cost, setCost] = useState(0);
    const [loading, setLoading] = useState(false);

    // Fetch listing info
    useEffect(() => {
        const fetchListing = async () => {
            try {
                const res = await fetch(`${serverUrl}/api/listings/${listingId}`);
                const data = await res.json();
                if (res.ok) setListing(data);
                else alert(data.message);
            } catch (err) {
                console.error(err);
                alert("Error fetching listing");
            }
        };
        fetchListing();
    }, [listingId]);

    // Calculate cost when dates change
    useEffect(() => {
        if (checkin && checkout && listing) {
            const start = new Date(checkin);
            const end = new Date(checkout);
            const days = (end - start) / (1000 * 60 * 60 * 24);
            if (days > 0) {
                setCost(days * listing.rent);
            } else {
                setCost(0);
            }
        } else {
            setCost(0);
        }
    }, [checkin, checkout, listing]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!checkin || !checkout) {
            alert("Select both dates");
            return;
        }
        if (cost <= 0) {
            alert("Invalid dates");
            return;
        }

        try {
            setLoading(true);
            const res = await fetch(`${serverUrl}/api/bookings/create`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ listingId, checkin, checkout }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            alert("Booking successful!");
            navigate("/my-bookings");
        } catch (err) {
            console.error(err);
            alert(err.message || "Error creating booking");
        } finally {
            setLoading(false);
        }
    };

    if (!listing) return <div className="p-4">Loading...</div>;

    return (
        <div className="min-h-screen bg-black text-gray-200 p-4 flex items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="bg-gray-900 p-6 rounded w-full max-w-md border border-gray-800 space-y-4"
            >
                <h2 className="text-2xl font-bold">{listing.title}</h2>
                <img
                    src={listing.images[0]}
                    alt={listing.title}
                    className="w-full h-48 object-cover rounded"
                />
                <p className="text-gray-400">{listing.location}</p>
                <p className="text-gray-300">Rent per day: ₹ {listing.rent}</p>

                <div className="space-y-2">
                    <label className="block">Check-in Date:</label>
                    <input
                        type="date"
                        value={checkin}
                        onChange={(e) => setCheckin(e.target.value)}
                        required
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded"
                    />

                    <label className="block">Check-out Date:</label>
                    <input
                        type="date"
                        value={checkout}
                        onChange={(e) => setCheckout(e.target.value)}
                        required
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded"
                    />
                </div>

                <p className="text-lg mt-2">Total Cost: ₹ {cost}</p>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2 bg-white text-black rounded hover:bg-opacity-90 transition"
                >
                    {loading ? "Booking..." : "Confirm Booking"}
                </button>
            </form>
        </div>
    );
}
