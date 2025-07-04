import { Link } from "react-router-dom";

export default function ListCard({ listing, currentUser, onDelete }) {
  const isOwner = currentUser && listing.host && listing.host._id === currentUser._id;

  return (
    <div className="bg-gray-900 border border-gray-800 rounded p-4 flex flex-col">
      {listing.images?.[0] && (
        <img
          src={listing.images[0]}
          alt={listing.title}
          className="w-full h-48 object-cover rounded mb-2"
        />
      )}
      <h3 className="text-xl font-semibold">{listing.title}</h3>
      <p className="text-gray-400">{listing.location}</p>
      <p className="text-sm text-gray-400">Category: {listing.category}</p>
      <p className="text-gray-300 mt-1">₹ {listing.rent} / night</p>

      <div className="mt-auto flex gap-2 flex-wrap">
        {isOwner ? (
          <>
            <Link
              to={`/edit-listing/${listing._id}`}
              className="text-blue-400 hover:underline text-sm"
            >
              Edit
            </Link>
            <button
              onClick={() => {
                if (window.confirm("Delete this listing?")) onDelete?.();
              }}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              Delete
            </button>
          </>
        ) : (
          <Link
            to={`/book/${listing._id}`}
            className="bg-white text-black py-1 px-3 rounded text-sm hover:bg-opacity-90 transition"
          >
            Book Now
          </Link>
        )}
      </div>
    </div>
  );
}
