// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Nav from './components/Nav';
import Profile from './pages/Profile';
import Listings from './pages/Listings';
import CreateListing from './pages/CreateListing';
import EditListing from './pages/EditListing';
import MyListings from './pages/MyListings';
import CreateBooking from './pages/CreateBooking';
import MyBookings from './pages/MyBookings';
import BookList from './pages/BookList';
import BookingsInfo from './pages/BookingsInfo';

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/listings/create" element={<CreateListing />} />
        <Route path="/edit-listing/:id" element={<EditListing />} />
        <Route path="/my-listings" element={<MyListings />} />
        <Route path="/book/:listingId" element={<CreateBooking />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/book/:id" element={<BookList />} />
        <Route path="/bookings-info" element={<BookingsInfo />} />

      </Routes>
    </>
  );
}

export default App;
