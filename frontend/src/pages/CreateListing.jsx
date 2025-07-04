import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { authDataContext } from "../context/authContext";

export default function CreateListing() {
    const { serverUrl } = useContext(authDataContext);
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        description: "",
        location: "",
        rent: "",
        category: "",
    });
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (images.length === 0) {
            alert("Please select at least one image.");
            return;
        }
        try {
            setLoading(true);
            const formData = new FormData();
            for (const key in form) {
                formData.append(key, form[key]);
            }
            images.forEach((image) => formData.append("images", image));

            const res = await fetch(`${serverUrl}/api/listings/create`, {
                method: "POST",
                credentials: "include",
                body: formData,
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            alert("Listing created successfully!");
            navigate("/listings");
        } catch (err) {
            console.error(err);
            alert(err.message || "Error creating listing");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-gray-200 flex items-center justify-center p-4">
            <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 bg-gray-900 p-6 rounded border border-gray-800">
                <h2 className="text-2xl font-bold">Create Listing</h2>

                <input
                    type="text"
                    placeholder="Title"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    required
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded"
                />
                <textarea
                    placeholder="Description"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded"
                />
                <input
                    type="text"
                    placeholder="Location"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    required
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded"
                />
                <input
                    type="number"
                    placeholder="Rent"
                    value={form.rent}
                    onChange={(e) => setForm({ ...form, rent: e.target.value })}
                    required
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded"
                />
                <input
                    type="text"
                    placeholder="Category"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    required
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded"
                />

                <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => setImages(Array.from(e.target.files))}
                    className="w-full"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2 bg-white text-black rounded hover:bg-opacity-90 transition"
                >
                    {loading ? "Creating..." : "Create Listing"}
                </button>
            </form>
        </div>
    );
}
