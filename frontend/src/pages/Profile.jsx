import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { FaUserCircle, FaEdit, FaSignOutAlt, FaEnvelope, FaUser, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { authDataContext } from "../context/authContext";

export default function Profile() {
  const navigate = useNavigate();
  const { serverUrl, user, logout } = useContext(authDataContext);
  const [profile, setProfile] = useState(user);
  const [loading, setLoading] = useState(!user);

  useEffect(() => {
    if (!user) {
      const fetchProfile = async () => {
        try {
          const res = await fetch(`${serverUrl}/api/user/profile`, {
            credentials: "include",
          });
          if (!res.ok) throw new Error("Failed to load profile");
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
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-20 h-20 bg-gray-700 rounded-full mb-4"></div>
          <div className="h-6 w-40 bg-gray-700 rounded mb-2"></div>
          <div className="h-4 w-32 bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-black text-gray-200 flex items-center justify-center">
        <div className="text-center p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/30">
          <h2 className="text-xl font-semibold mb-2">No profile data found</h2>
          <p className="text-gray-400 mb-4">Please login to access your profile</p>
          <button 
            onClick={() => navigate('/login')}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const handleEdit = () => navigate("/edit-profile");
  const handleLogout = () => { logout(); navigate("/"); };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-4xl flex flex-col lg:flex-row bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/30 shadow-2xl overflow-hidden">
        {/* Profile Image Section (Left) */}
        <div className="w-full lg:w-1/3 bg-gradient-to-b from-gray-800 to-gray-700 p-8 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-gray-700/30">
          <div className="relative mb-6">
            <FaUserCircle className="w-32 h-32 text-indigo-400" />
            <button 
              onClick={handleEdit}
              className="absolute -bottom-2 -right-2 bg-indigo-600 hover:bg-indigo-700 p-2 rounded-full transition-colors"
              aria-label="Edit profile"
            >
              <FaEdit className="w-5 h-5" />
            </button>
          </div>
          <h2 className="text-2xl font-bold text-white text-center">{profile.name}</h2>
          <p className="text-indigo-300 mt-2 flex items-center">
            <FaEnvelope className="mr-2" /> {profile.email}
          </p>
        </div>

        {/* Profile Details Section (Right) */}
        <div className="w-full lg:w-2/3 p-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-700/50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <FaUser className="text-indigo-400 mr-3" />
                    <span className="text-sm text-gray-400">Full Name</span>
                  </div>
                  <p className="text-white">{profile.name || 'Not set'}</p>
                </div>

                <div className="bg-gray-700/50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <FaEnvelope className="text-indigo-400 mr-3" />
                    <span className="text-sm text-gray-400">Email</span>
                  </div>
                  <p className="text-white">{profile.email}</p>
                </div>

                {profile.phone && (
                  <div className="bg-gray-700/50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <FaPhone className="text-indigo-400 mr-3" />
                      <span className="text-sm text-gray-400">Phone</span>
                    </div>
                    <p className="text-white">{profile.phone}</p>
                  </div>
                )}

                {profile.address && (
                  <div className="bg-gray-700/50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <FaMapMarkerAlt className="text-indigo-400 mr-3" />
                      <span className="text-sm text-gray-400">Address</span>
                    </div>
                    <p className="text-white">{profile.address}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4">
              <h3 className="text-lg font-semibold text-white mb-4">Account Actions</h3>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleEdit}
                  className="flex-1 flex items-center justify-center py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
                >
                  <FaEdit className="mr-2" /> Edit Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="flex-1 flex items-center justify-center py-3 px-4 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
                >
                  <FaSignOutAlt className="mr-2" /> Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}