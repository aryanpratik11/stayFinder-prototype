import bookings from "../models/bookings.js";
import listings from "../models/listings.js";
import users from "../models/users.js";

export const createBooking = async (req, res) => {
    try {
        const clientId = req.user._id;
        const { listingId, checkin, checkout } = req.body;

        const listing = await listings.findById(listingId);
        if (!listing) {
            return res.status(404).json({ message: "Listing not found." });
        }

        const days =
            (new Date(checkout).getTime() - new Date(checkin).getTime()) /
            (1000 * 60 * 60 * 24);

        if (days <= 0) {
            return res.status(400).json({ message: "Checkout date must be after checkin date." });
        }

        const overlapping = await bookings.findOne({
            listing: listingId,
            status: "booked",
            $or: [
                { checkin: { $lt: new Date(checkout) }, checkout: { $gt: new Date(checkin) } }
            ]
        });

        if (overlapping) {
            return res.status(400).json({ message: "This listing is already booked for the selected dates." });
        }

        const cost = days * listing.rent;

        const booking = await bookings.create({
            host: listing.host,
            client: clientId,
            listing: listing._id,
            checkin,
            checkout,
            cost,
        });

        await users.findByIdAndUpdate(
            clientId,
            { $push: { bookings: booking._id } },
            { new: true }
        );

        res.status(201).json(booking);
    } catch (error) {
        console.error("Create booking error:", error);
        res.status(500).json({ message: "Failed to create booking." });
    }
};

export const getMyBookings = async (req, res) => {
    try {
        const userId = req.user._id;

        const userBookings = await bookings
            .find({ client: userId })
            .populate("listing", "title images location rent")
            .populate("host", "name email");

        res.status(200).json(userBookings);
    } catch (error) {
        console.error("Get bookings error:", error);
        res.status(500).json({ message: "Failed to fetch bookings." });
    }
};

export const cancelBooking = async (req, res) => {
    try {
        const bookingId = req.params.id;
        const userId = req.user._id;

        const booking = await bookings.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found." });
        }

        // Only client can cancel
        if (!booking.client.equals(userId)) {
            return res.status(403).json({ message: "You cannot cancel this booking." });
        }

        booking.status = "cancelled";
        await booking.save();

        res.status(200).json({ message: "Booking cancelled." });
    } catch (error) {
        console.error("Cancel booking error:", error);
        res.status(500).json({ message: "Failed to cancel booking." });
    }
};


export const getBookingsInfo = async (req, res) => {
  try {
    const hostId = req.user._id;

    const hostBookings = await bookings
      .find({ host: hostId })
      .populate("client", "name email")
      .populate("listing", "title images location rent");

    res.status(200).json(hostBookings);
  } catch (error) {
    console.error("Get host bookings error:", error);
    res.status(500).json({ message: "Failed to fetch host bookings." });
  }
};