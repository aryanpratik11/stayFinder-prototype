import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { authDataContext } from "../context/authContext";

export default function Profile() {
  const navigate = useNavigate();
  const { serverUrl, user, logout } = useContext(authDataContext);
  const [profile, setProfile] = useState(user); // fallback to context if available
  const [loading, setLoading] = useState(!user);

  useEffect(() => {
    // If context user is null, fetch from backend
    if (!user) {
      const fetchProfile = async () => {
        try {
          const res = await fetch(`${serverUrl}/api/user/profile`, {
            credentials: "include",
          });
          if (!res.ok) {
            throw new Error("Failed to load profile");
          }
          const data = await res.json();
          setProfile(data);
        } catch (err) {
          console.error(err);
          alert("Please login again");
          navigate("/login");
        } finally {
          setLoading(false);
        }
      };

      fetchProfile();
    }
  }, [user, serverUrl, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-gray-200 flex items-center justify-center">
        Loading profile...
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-black text-gray-200 flex items-center justify-center">
        No profile data found.
      </div>
    );
  }

  const handleEdit = () => {
    navigate("/edit-profile");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-black text-gray-200 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-900 rounded-xl border border-gray-800 shadow-lg p-6">
        <div className="flex flex-col items-center text-center">
          <FaUserCircle className="w-20 h-20 text-gray-500 mb-4" />
          <h2 className="text-2xl font-bold">{profile.name}</h2>
          <p className="text-gray-400">{profile.email}</p>
        </div>

        <div className="mt-6 space-y-3">
          <button
            onClick={handleEdit}
            className="w-full py-2 bg-white text-black rounded hover:bg-opacity-90 transition"
          >
            Edit Profile
          </button>
          <button
            onClick={handleLogout}
            className="w-full py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
