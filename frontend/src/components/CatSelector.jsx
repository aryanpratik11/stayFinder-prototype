import { PiBuildingApartment } from "react-icons/pi";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineVilla, MdOutlineBedroomChild } from "react-icons/md";
import { LiaHotelSolid, LiaIndustrySolid } from "react-icons/lia";
import { BsShop } from "react-icons/bs";

const categories = [
    { name: "Hotels", icon: <LiaHotelSolid className="w-5 h-5" /> },
    { name: "Apartments", icon: <PiBuildingApartment className="w-5 h-5" /> },
    { name: "Houses", icon: <IoHomeOutline className="w-5 h-5" /> },
    { name: "Villas", icon: <MdOutlineVilla className="w-5 h-5" /> },
    { name: "Industrial", icon: <LiaIndustrySolid className="w-5 h-5" /> },
    { name: "PG & Hostel", icon: <MdOutlineBedroomChild className="w-5 h-5" /> },
    { name: "Shops", icon: <BsShop className="w-5 h-5" /> },
];

export default function CatSelector({ selected, onSelect }) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {categories.map((cat) => (
                <button
                    key={cat.name}
                    onClick={() => onSelect(cat.name)}
                    className={`flex items-center gap-2 p-2 rounded border
            ${selected === cat.name
                            ? "bg-indigo-600 border-indigo-500 text-white"
                            : "bg-gray-800 border-gray-700 hover:bg-gray-700 text-gray-200"
                        }`}
                >
                    {cat.icon}
                    <span className="text-sm">{cat.name}</span>
                </button>
            ))}
        </div>
    );
}
