import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { authDataContext } from "../context/authContext";

export default function BookList() {
  const { id } = useParams();
  const { serverUrl } = useContext(authDataContext);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchListing() {
      try {
        const res = await fetch(`${serverUrl}/api/listings/${id}`, {
          credentials: "include",
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch listing.");
        setListing(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchListing();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold">{listing.title}</h2>
      {/* Show listing details */}
    </div>
  );
}
