import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { authDataContext } from "../context/authContext";
import CatSelector from "../components/CatSelector";

export default function CreateListing() {
    const { serverUrl } = useContext(authDataContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        city: "",
        state: "",
        location: "",
        rent: "",
        category: "",
        images: []
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.category) {
            setError("Please select a category.");
            return;
        }
        if (formData.images.length === 0) {
            setError("Please upload at least one image.");
            return;
        }

        try {
            setLoading(true);
            setError("");
            const data = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                if (key === "images") {
                    value.forEach(img => data.append("images", img));
                } else {
                    data.append(key, value);
                }
            });

            const res = await fetch(`${serverUrl}/api/listings/create`, {
                method: "POST",
                credentials: "include",
                body: data,
            });

            const responseData = await res.json();
            if (!res.ok) throw new Error(responseData.message);
            navigate("/listings");
        } catch (err) {
            console.error(err);
            setError(err.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black p-4 md:p-8">
            <div className="max-w-3xl mx-auto bg-gray-800 rounded-xl shadow-lg overflow-hidden p-6 border border-gray-700">
                <div className="mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-white">
                        Create New Listing
                    </h2>
                    <p className="text-gray-400 mt-2">
                        Fill in the details of your property
                    </p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-900/30 text-red-300 rounded-lg border border-red-800">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-300">
                                Title*
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white placeholder-gray-400"
                                placeholder="Name of you listing"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-300">
                                Rent (₹)*
                            </label>
                            <input
                                type="number"
                                name="rent"
                                value={formData.rent}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white placeholder-gray-400"
                                placeholder="Rent per night"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-300">
                            Description*
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white placeholder-gray-400"
                            rows="4"
                            placeholder="Describe your property in detail..."
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-300">
                                City*
                            </label>
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white placeholder-gray-400"
                                placeholder="City"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-300">
                                State*
                            </label>
                            <input
                                type="text"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white placeholder-gray-400"
                                placeholder="State"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-300">
                            Full Address / Location*
                        </label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white placeholder-gray-400"
                            placeholder="Full address with landmarks"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-300">
                            Category*
                        </label>
                        <CatSelector
                            selected={formData.category}
                            onSelect={(category) => setFormData(prev => ({ ...prev, category }))}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-300">
                            Upload Images* (Minimum 1)
                        </label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-lg">
                            <div className="space-y-1 text-center">
                                <div className="flex text-sm text-gray-400">
                                    <label
                                        htmlFor="file-upload"
                                        className="relative cursor-pointer rounded-md font-medium text-indigo-400 hover:text-indigo-300 focus-within:outline-none"
                                    >
                                        <span>Upload files</span>
                                        <input
                                            id="file-upload"
                                            name="images"
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            onChange={(e) => setFormData(prev => ({
                                                ...prev,
                                                images: [...e.target.files]
                                            }))}
                                            className="sr-only"
                                        />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs text-gray-500">
                                    PNG, JPG, GIF up to 10MB
                                </p>
                            </div>
                        </div>
                        {formData.images.length > 0 && (
                            <div className="mt-2 text-sm text-gray-400">
                                {formData.images.length} file(s) selected
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <span className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Creating...
                                </span>
                            ) : "Create Listing"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}