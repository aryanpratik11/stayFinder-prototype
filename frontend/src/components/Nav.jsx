import { Link } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useContext } from "react";
import { authDataContext } from "../context/authContext";

export default function Nav() {
    const { isAuthenticated, logout } = useContext(authDataContext);
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div>
            <nav className="bg-black text-white border-b border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <Link to="/" className="text-2xl font-bold hover:text-gray-300">
                        StayFinder
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-6 items-center">
                        <Link to="/" className="hover:text-gray-300">
                            Home
                        </Link>
                        <Link to="/listings" className="hover:text-gray-300">
                            Listings
                        </Link>
                        <Link to="/contact" className="hover:text-gray-300">
                            Contact
                        </Link>
                        {isAuthenticated ? (
                            <>
                                <Link to="/profile" className="hover:text-gray-300">
                                    Profile
                                </Link>
                                <button onClick={logout} className="bg-white text-black px-3 py-1 rounded hover:bg-opacity-90">
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="bg-white text-black px-3 py-1 rounded hover:bg-opacity-90"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="bg-white text-black px-3 py-1 rounded hover:bg-opacity-90"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-gray-400 hover:text-white focus:outline-none"
                        onClick={toggleMenu}
                    >
                        {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden px-4 pb-4 space-y-2">
                    <Link to="/" className="block hover:text-gray-300">
                        Home
                    </Link>
                    <Link to="/listings" className="block hover:text-gray-300">
                        Listings
                    </Link>
                    <Link to="/contact" className="block hover:text-gray-300">
                        Contact
                    </Link>
                    {isAuthenticated ? (
                        <>
                            <Link to="/profile" className="block hover:text-gray-300">
                                Profile
                            </Link>
                            <button className="block w-full text-left hover:text-gray-300">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="block hover:text-gray-300">
                                Login
                            </Link>
                            <Link to="/register" className="block hover:text-gray-300">
                                Register
                            </Link>
                        </>
                    )}
                </div>
            )}
        </nav>

        </div>
    );
}
