import express from "express";
import isAuth from "../middleware/isAuth.js";
import { cancelBooking, createBooking, getBookingsInfo, getMyBookings } from "../controllers/bookingControllers.js";

const bookingRouter = express.Router();

bookingRouter.post("/create", isAuth, createBooking);
bookingRouter.get("/my-bookings", isAuth, getMyBookings);
bookingRouter.put("/cancel/:id", isAuth, cancelBooking);
bookingRouter.get("/bookings-info", isAuth, getBookingsInfo);

export default bookingRouter;