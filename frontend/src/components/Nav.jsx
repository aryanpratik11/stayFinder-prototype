import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import { authDataContext } from "../context/authContext";
import { listingDataContext } from "../context/listingContext";

export default function Nav() {
  const { isAuthenticated, logout, user } = useContext(authDataContext);
  const { listings } = useContext(listingDataContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const isHost = isAuthenticated && user && listings.some(l => l.host?._id === user._id);
  const navigate = useNavigate();

  return (
    <nav className="bg-black text-white border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between h-16 items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold hover:text-gray-300">
          StayFinder
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="hover:text-gray-300">Home</Link>
          <Link to="/listings" className="hover:text-gray-300">Listings</Link>
          {isAuthenticated && (
            <Link to="/listings/create" className="hover:text-gray-300">+ Create Listing</Link>
          )}
          {/* Dropdown */}
          <div className="relative">
            <button onClick={toggleDropdown} className="flex items-center hover:text-gray-300 focus:outline-none">
              <FaUserCircle className="mr-1" />
              Account
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-700 rounded shadow-lg z-50">
                {isAuthenticated ? (
                  <>
                    <Link to="/profile" onClick={() => { setDropdownOpen(false); }} className="block px-4 py-2 hover:bg-gray-800">Profile</Link>
                    <Link to="/my-listings" onClick={() => { setDropdownOpen(false); }} className="block px-4 py-2 hover:bg-gray-800">My Listings</Link>
                    <Link to="/my-bookings" onClick={() => { setDropdownOpen(false); }} className="block px-4 py-2 hover:bg-gray-800">My Bookings</Link>
                    {isHost && (
                      <Link to="/bookings-info" onClick={() => { setDropdownOpen(false); }} className="block px-4 py-2 hover:bg-gray-800"> Manage Booking Requests </Link>
                    )}
                    <button onClick={() => {
                      logout();
                      setDropdownOpen(false);
                      navigate("/");
                    }} className="block w-full text-left px-4 py-2 hover:bg-gray-800">
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => { setDropdownOpen(false); }} className="block px-4 py-2 hover:bg-gray-800">Login</Link>
                    <Link to="/register" onClick={() => { setDropdownOpen(false); }} className="block px-4 py-2 hover:bg-gray-800">Register</Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-400 hover:text-white focus:outline-none" onClick={toggleMenu}>
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <Link to="/" onClick={toggleMenu} className="block hover:text-gray-300">Home</Link>
          <Link to="/listings" onClick={toggleMenu} className="block hover:text-gray-300">Listings</Link>
          {isAuthenticated && (
            <>
              <Link to="/listings/create" onClick={toggleMenu} className="block hover:text-gray-300">+ Create Listing</Link>
              <Link to="/profile" onClick={toggleMenu} className="block hover:text-gray-300">Profile</Link>
              <Link to="/my-listings" onClick={toggleMenu} className="block hover:text-gray-300">My Listings</Link>
              <Link to="/my-bookings" onClick={toggleMenu} className="block hover:text-gray-300">My Bookings</Link>
              {isHost && (
                <Link to="/bookings-info" onClick={toggleMenu} className="block hover:text-gray-300">
                  Manage Booking Requests
                </Link>
              )}
              <button
                onClick={() => {
                  logout();
                  toggleMenu();
                  navigate("/");
                }}
                className="block w-full text-left hover:text-gray-300"
              >
                Logout
              </button>
            </>
          )}
          {!isAuthenticated && (
            <>
              <Link to="/login" onClick={toggleMenu} className="block hover:text-gray-300">Login</Link>
              <Link to="/register" onClick={toggleMenu} className="block hover:text-gray-300">Register</Link>
            </>
          )}
        </div>
      )
      }
    </nav >
  );
}
