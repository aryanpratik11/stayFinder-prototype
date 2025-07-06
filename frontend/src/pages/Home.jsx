import { Link } from 'react-router-dom';
import SecNav from '../components/SecNav';

export default function Home() {
    const featuredListings = [
        {
            id: 1,
            title: "Black Marble Villa",
            location: "Bali, Indonesia",
            price: 320,
            image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGFyayUyMG1hcmJsZSUyMGhvdXNlfGVufDB8fDB8fHww"
        },
        {
            id: 2,
            title: "Crystal Cave Suite",
            location: "Reykjavik, Iceland",
            price: 280,
            image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZGFyayUyMGNhdmUlMjByb29tfGVufDB8fDB8fHww"
        },
        {
            id: 3,
            title: "Midnight Loft",
            location: "New York, USA",
            price: 195,
            image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJsYWNrJTIwbW9kZXJuJTIwYXBhcnRtZW50fGVufDB8fDB8fHww"
        }
    ];

    return (
        <div className="min-h-screen bg-black text-gray-200">
            <SecNav />
            {/* Hero Section */}
            <div className="relative h-screen overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-60"></div>
                <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bHV4dXJ5JTIwaG9tZXxlbnwwfHwwfHx8MA%3D%3D"
                    alt="Luxury Home"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 glow-text">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                            StayFinder
                        </span>
                        <span className="text-white">.</span>
                    </h1>
                    <p className="text-xl md:text-2xl max-w-2xl mb-10 text-gray-300">
                        Light up your journey with standout stays.
                    </p>
                    <div className="flex space-x-4">
                        <Link
                            to="/register"
                            className="px-8 py-3 bg-white text-black rounded-full font-medium hover:bg-opacity-90 transition glow-on-hover"
                        >
                            Get Started
                        </Link>
                        <Link
                            to="/login"
                            className="px-8 py-3 border border-gray-600 rounded-full font-medium hover:border-gray-400 transition"
                        >
                            Sign In
                        </Link>
                    </div>
                </div>
            </div>

            {/* Featured Listings */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <h2 className="text-3xl font-bold mb-12 text-center glow-text">Featured Properties</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredListings.map((listing) => (
                        <div key={listing.id} className="group relative overflow-hidden rounded-xl">
                            <div className="aspect-[4/3] overflow-hidden">
                                <img
                                    src={listing.image}
                                    alt={listing.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                />
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
                                <h3 className="text-xl font-semibold group-hover:text-white transition">{listing.title}</h3>
                                <p className="text-gray-300">{listing.location}</p>
                                <p className="mt-2 text-white font-medium glow">
                                    ${listing.price} <span className="text-gray-400">/ night</span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}