import { Link } from "react-router-dom";
import { useState } from "react";
import {
    FaBed,
    FaBath,
    FaMapMarkerAlt,
    FaRupeeSign,
    FaStar,
    FaChevronLeft,
    FaChevronRight,
    FaRegHeart,
    FaHeart
} from "react-icons/fa";

export default function ListCard({ listing, currentUser, onDelete }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);
    const isOwner = currentUser && listing.host && listing.host._id === currentUser._id;

    const nextImage = () => {
        setCurrentImageIndex(prev =>
            prev === (listing.images?.length - 1 || 0) ? 0 : prev + 1
        );
    };

    const prevImage = () => {
        setCurrentImageIndex(prev =>
            prev === 0 ? (listing.images?.length - 1 || 0) : prev - 1
        );
    };


    const locationParts = [
        listing.city,
        listing.state,
    ].filter(Boolean);
    const shortLocation = locationParts.join(', ');

    return (
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
            {/* Image Slider Section */}
            <div className="relative h-52 w-full overflow-hidden">
                {listing.images?.length > 0 ? (
                    <>
                        {/* Images */}
                        {listing.images.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={`${listing.title} ${index + 1}`}
                                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                                    }`}
                            />
                        ))}

                        {/* Navigation Arrows (only show if multiple images) */}
                        {listing.images.length > 1 && (
                            <>
                                <button
                                    onClick={(e) => { e.stopPropagation(); prevImage(); }}
                                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-black/70"
                                >
                                    <FaChevronLeft size={14} />
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); nextImage(); }}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-black/70"
                                >
                                    <FaChevronRight size={14} />
                                </button>
                            </>
                        )}

                        {/* Image Indicators */}
                        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
                            {listing.images.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(index); }}
                                    className={`h-1.5 w-1.5 rounded-full transition-all ${index === currentImageIndex ? 'bg-white w-4' : 'bg-white/50'
                                        }`}
                                    aria-label={`View image ${index + 1}`}
                                />
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-700 text-gray-400">
                        No Images Available
                    </div>
                )}

            </div>

            {/* Content Section */}
            <div className="p-4">
                <div className="flex justify-between items-start gap-2">
                    <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-white truncate">{listing.title}</h3>
                        <div className="flex items-center text-gray-400 text-sm mt-1 truncate">
                            <FaMapMarkerAlt className="flex-shrink-0 mr-1" />
                            <span className="truncate">{listing.location}</span>
                        </div>
                        <div className="flex items-center text-gray-400 text-sm mt-1 truncate">
                            <span className="truncate" title={shortLocation}>
                                {shortLocation}
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center text-white font-semibold whitespace-nowrap pl-2">
                        <FaRupeeSign className="mr-0.5" />
                        {listing.rent?.toLocaleString()}
                        <span className="text-gray-400 text-xs ml-0.5">/night</span>
                    </div>
                </div>

                {/* Property Features */}
                <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3 text-sm text-gray-300">
                    {listing.bedrooms && (
                        <div className="flex items-center">
                            <FaBed className="mr-1.5" />
                            <span>{listing.bedrooms} {listing.bedrooms > 1 ? 'Beds' : 'Bed'}</span>
                        </div>
                    )}
                    {listing.bathrooms && (
                        <div className="flex items-center">
                            <FaBath className="mr-1.5" />
                            <span>{listing.bathrooms} {listing.bathrooms > 1 ? 'Baths' : 'Bath'}</span>
                        </div>
                    )}
                    {listing.area && (
                        <div className="flex items-center">
                            <span>{listing.area} sq.ft</span>
                        </div>
                    )}
                </div>

                {/* Additional Info */}
                {listing.category && (
                    <div className="mt-2 text-xs text-gray-400">
                        <span className="text-gray-300 font-medium">{listing.category}</span>
                        {listing.furnishing && (
                            <span className="ml-2">
                                • <span className="text-gray-300">{listing.furnishing}</span>
                            </span>
                        )}
                    </div>
                )}

                {/* Action Buttons */}
                <div className="mt-4 pt-3 border-t border-gray-700 flex gap-2">
                    {isOwner ? (
                        <>
                            <Link
                                to={`/edit-listing/${listing._id}`}
                                className="flex-1 text-center px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded transition-colors"
                            >
                                Edit
                            </Link>
                            <button
                                onClick={() => {
                                    if (window.confirm("Are you sure you want to delete this listing?")) onDelete?.();
                                }}
                                className="flex-1 px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded transition-colors"
                            >
                                Delete
                            </button>
                        </>
                    ) : (
                        <Link
                            to={`/book/${listing._id}`}
                            className="flex-1 text-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded transition-colors"
                        >
                            Book Now
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}