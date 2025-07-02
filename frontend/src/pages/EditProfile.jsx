import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { authDataContext } from "../context/authContext";

export default function EditProfile() {
    const navigate = useNavigate();
    const { serverUrl, user, login } = useContext(authDataContext);

    const [loading, setLoading] = useState(!user);
    const [form, setForm] = useState({
        name: user?.name || "",
        email: user?.email || "",
    });

    useEffect(() => {
        if (!user) {
            const fetchProfile = async () => {
                try {
                    const res = await fetch(`${serverUrl}/api/user/profile`, {
                        credentials: "include",
                    });
                    const data = await res.json();
                    if (!res.ok) throw new Error(data.message);
                    setForm({ name: data.name, email: data.email });
                } catch (err) {
                    console.error(err);
                    alert("Failed to load profile. Please log in again.");
                    navigate("/login");
                } finally {
                    setLoading(false);
                }
            };
            fetchProfile();
        } else {
            setLoading(false);
        }
    }, [serverUrl, user, navigate]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${serverUrl}/api/user/update`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            // ✅ Update auth context
            login(data);

            alert("Profile updated!");
            navigate("/profile");
        } catch (err) {
            console.error(err);
            alert(err.message || "Update error");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black text-gray-200">
                Loading...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-gray-200 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-gray-900 rounded-xl border border-gray-800 shadow-lg p-6">
                <h2 className="text-2xl font-bold text-center mb-4">Edit Profile</h2>
                <form onSubmit={handleUpdate} className="space-y-4">
                    <div>
                        <label className="block mb-1">Name</label>
                        <input
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Email</label>
                        <input
                            type="email"
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            required
                        />
                    </div>
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
