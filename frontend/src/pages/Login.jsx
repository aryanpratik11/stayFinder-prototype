// src/pages/Login.jsx
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import { useState, useContext } from "react";
import { authDataContext } from "../context/authContext";

export default function Login() {
  const navigate = useNavigate();
  const { serverUrl, login } = useContext(authDataContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${serverUrl}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      if (!data.user) {
        throw new Error("User data not returned from API.");
      }

      // Update context state
      login(data.user);

      // Optionally: save to localStorage (if you want persistence)
      // localStorage.setItem("user", JSON.stringify(data.user));

      alert("Login successful!");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert(error.message || "Login error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative">
      {/* Back Button */}
      <Link
        to="/"
        className="absolute top-6 left-6 text-gray-400 hover:text-white transition-colors duration-200 flex items-center"
      >
        <FaArrowLeft className="mr-2 w-[30px] h-[30px]" />
      </Link>

      <div className="w-full max-w-md bg-gray-900 rounded-xl overflow-hidden border border-gray-800 shadow-xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-8 text-center border-b border-gray-800">
          <h2 className="text-3xl font-bold mb-2 glow-text">Welcome Back</h2>
          <p className="text-gray-400">Sign in to your StayFinder account</p>
        </div>

        {/* Form */}
        <div className="p-8">
          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 text-white placeholder-gray-500"
                placeholder="Email Id"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 text-white placeholder-gray-500 pr-10"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-white"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 bg-gray-800 border-gray-700 rounded focus:ring-gray-600"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link to="/forgot-password" className="font-medium text-gray-300 hover:text-white">
                  Forgot password?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-white text-black rounded-lg font-medium hover:bg-opacity-90 transition glow-on-hover"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Don't have an account?{" "}
              <Link to="/register" className="text-white font-medium hover:underline">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
