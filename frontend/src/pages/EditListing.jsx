import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { authDataContext } from "../context/authContext";

export default function EditListing() {
    const { id } = useParams();
    const { serverUrl } = useContext(authDataContext);
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        description: "",
        location: "",
        rent: "",
        category: "",
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchListing = async () => {
            try {
                const res = await fetch(`${serverUrl}/api/listings/${id}`);
                const data = await res.json();
                if (!res.ok) throw new Error(data.message);
                setForm({
                    title: data.title,
                    description: data.description,
                    location: data.location,
                    rent: data.rent,
                    category: data.category,
                });
            } catch (err) {
                console.error(err);
                alert(err.message || "Failed to load listing.");
                navigate("/listings");
            } finally {
                setLoading(false);
            }
        };
        fetchListing();
    }, [id, serverUrl, navigate]);

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${serverUrl}/api/listings/update/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message);
            alert("Listing updated!");
            navigate("/listings");
        } catch (err) {
            console.error(err);
            alert(err.message || "Failed to update listing.");
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-black text-gray-200 flex justify-center items-center p-4">
            <div className="w-full max-w-lg bg-gray-900 border border-gray-800 rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4">Edit Listing</h2>
                <form onSubmit={handleUpdate} className="space-y-4">
                    {["title", "description", "location", "rent", "category"].map((field) => (
                        <div key={field}>
                            <label className="block mb-1 capitalize">{field}</label>
                            <input
                                type={field === "rent" ? "number" : "text"}
                                name={field}
                                required
                                value={form[field]}
                                onChange={handleChange}
                                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded"
                            />
                        </div>
                    ))}
                    <button
                        type="submit"
                        className="w-full py-2 bg-white text-black rounded hover:bg-opacity-90 transition"
                    >
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
}
