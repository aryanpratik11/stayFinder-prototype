import { createContext, useState, useContext } from "react";
import { authDataContext } from "./authContext.jsx";

export const listingDataContext = createContext();

export const ListingProvider = ({ children }) => {
    const { serverUrl } = useContext(authDataContext);

    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [rent, setRent] = useState("");
    const [category, setCategory] = useState("");
    const [images, setImages] = useState([]);

    const fetchListings = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${serverUrl}/api/listings`);
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Failed to fetch listings.");
            setListings(data);
            setError(null);
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const addListing = (listing) => {
        setListings((prev) => [listing, ...prev]);
    };

    const removeListing = (id) => {
        setListings((prev) => prev.filter((l) => l._id !== id));
    };

    const updateListing = (updated) => {
        setListings((prev) =>
            prev.map((l) => (l._id === updated._id ? updated : l))
        );
    };

    return (
        <listingDataContext.Provider
            value={{
                listings,
                loading,
                error,
                fetchListings,
                addListing,
                removeListing,
                updateListing,
                // Form fields
                title,
                setTitle,
                description,
                setDescription,
                location,
                setLocation,
                rent,
                setRent,
                category,
                setCategory,
                images,
                setImages,
            }}
        >
            {children}
        </listingDataContext.Provider>
    );
};
