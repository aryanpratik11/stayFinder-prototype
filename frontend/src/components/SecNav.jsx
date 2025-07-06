// src/components/SecondaryNav.jsx
import { Link } from "react-router-dom";
import { PiBuildingApartment } from "react-icons/pi";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineVilla, MdOutlineBedroomChild } from "react-icons/md";
import { LiaIndustrySolid, LiaHotelSolid  } from "react-icons/lia";
import { BsShop } from "react-icons/bs";

export default function SecNav() {
    return (
        <div className="bg-gray-800 text-gray-200 border-b border-gray-700 shadow-inner">
            <div className="max-w-7xl mx-auto px-4 py-2 flex gap-2 space-x-4 overflow-x-auto items-center justify-start md:justify-center">
                <Link to="/listings?category=Hotels" className="flex flex-col items-center justify-center px-3 py-2 rounded hover:bg-gray-700 hover:text-pink-400 transition whitespace-nowrap">
                    <LiaHotelSolid className="w-6 h-6 mb-1" />
                    <span className="text-sm">Hotels</span>
                </Link>
                <Link to="/listings?category=Apartments" className="flex flex-col items-center justify-center px-3 py-2 rounded hover:bg-gray-700 hover:text-pink-400 transition whitespace-nowrap">
                    <PiBuildingApartment className="w-6 h-6 mb-1" />
                    <span className="text-sm">Apartments</span>
                </Link>
                <Link to="/listings?category=Houses" className="flex flex-col items-center justify-center px-3 py-2 rounded hover:bg-gray-700 hover:text-pink-400 transition whitespace-nowrap">
                    <IoHomeOutline className="w-6 h-6 mb-1" />
                    <span className="text-sm">Houses</span>
                </Link>
                <Link to="/listings?category=Villas" className="flex flex-col items-center justify-center px-3 py-2 rounded hover:bg-gray-700 hover:text-pink-400 transition whitespace-nowrap">
                    <MdOutlineVilla className="w-6 h-6 mb-1" />
                    <span className="text-sm">Villas</span>
                </Link>
                <Link to="/listings?category=Industries" className="flex flex-col items-center justify-center px-3 py-2 rounded hover:bg-gray-700 hover:text-pink-400 transition whitespace-nowrap">
                    <LiaIndustrySolid className="w-6 h-6 mb-1" />
                    <span className="text-sm">Industrial</span>
                </Link>
                <Link to="/listings?category=PG" className="flex flex-col items-center justify-center px-3 py-2 rounded hover:bg-gray-700 hover:text-pink-400 transition whitespace-nowrap">
                    <MdOutlineBedroomChild className="w-6 h-6 mb-1" />
                    <span className="text-sm">PG & Hostels</span>
                </Link>
                <Link to="/listings?category=Shops" className="flex flex-col items-center justify-center px-3 py-2 rounded hover:bg-gray-700 hover:text-pink-400 transition whitespace-nowrap">
                    <BsShop className="w-6 h-6 mb-1" />
                    <span className="text-sm">Shops</span>
                </Link>
            </div>
        </div>
    );
}
