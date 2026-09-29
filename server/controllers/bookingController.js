const Booking = require('../models/Bookings.js');
const OTP = require('../models/OTP');
const Event = require('../models/Event');
const {sendOTPEmail, sendBookingEmail} = require('../utils/email');

const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

exports.sendBookingOTP = async (req, res) => {
    const otp = generateOTP();
    await OTP.findOneAndDelete({ email: req.user.email, action: 'event_booking' });
    await OTP.create({ email: req.user.email, otp, action: 'event_booking' });
    await sendOTPEmail(req.user.email, otp);
    res.status(200).json({ message: 'OTP sent to your email' });
};

exports.bookEvent = async (req, res) => {
    const { eventId, otp } = req.body;
    const otpRecord = await OTP.findOne({ email: req.user.email, otp, action: 'event_booking' });
    if (!otpRecord) {
        return res.status(400).json({ message: 'Invalid OTP' });
    }
    const event = await Event.findById(eventId);
    if (!event) {
        return res.status(404).json({ message: 'Event not found' });
    }
    if(event.availableSeats <= 0) {
        return res.status(400).json({ message: 'No available seats for this event' });
    }
    
    const existingBooking = await Booking.findOne({ userId: req.user._id, eventId, status: { $ne: 'cancelled' } });
    if (existingBooking) {
        return res.status(400).json({ message: 'You have already booked this event' });
    }

    const booking = await Booking.create({
        userId: req.user._id,
        eventId,
        status: 'pending',
        paymentStatus: 'unpaid',
        amount: event.ticketPrice,
    });

    await OTP.findOneAndDelete({ email: req.user.email, action: 'event_booking' });
    res.status(200).json({ message: 'Booking successful. Please check your email for further instructions.' });
};

exports.confirmBooking = async (req, res) => {
    const { paymentStatus } = req.body;
    if (!['paid', 'unpaid'].includes(paymentStatus)) {
        return res.status(400).json({ message: 'Invalid payment status' });
    }
    const booking = await Booking.findById(req.params.id).populate('eventId').populate('userId', 'name email');
    if (!booking) {
        return res.status(404).json({ message: 'Booking not found' });
    }
    if (booking.status !== 'pending') {
        return res.status(400).json({ message: 'Only pending bookings can be confirmed' });
    }
    if (!booking.eventId) {
        return res.status(404).json({ message: 'Event not found' });
    }

    const event = await Event.findOneAndUpdate(
        { _id: booking.eventId._id, availableSeats: { $gt: 0 } },
        { $inc: { availableSeats: -1 } },
        { new: true }
    );
    if (!event) {
        return res.status(400).json({ message: 'No available seats for this event' });
    }

    const confirmedBooking = await Booking.findOneAndUpdate(
        { _id: booking._id, status: 'pending' },
        { status: 'confirmed', paymentStatus },
        { new: true }
    ).populate('userId', 'name email');
    if (!confirmedBooking) {
        await Event.findByIdAndUpdate(event._id, { $inc: { availableSeats: 1 } });
        return res.status(409).json({ message: 'Booking is no longer pending' });
    }

    await sendBookingEmail(confirmedBooking.userId.email, confirmedBooking.userId.name, event.title);
    res.status(200).json({ message: 'Booking confirmed' });
}

exports.getAllBookings = async (req, res) => {
    const bookings = await Booking.find()
        .populate('userId', 'name email')
        .populate('eventId')
        .sort({ createdAt: -1 });
    res.status(200).json(bookings);
};

exports.getMyBookings = async (req, res) => {
    const bookings = await Booking.find({ userId: req.user._id }).populate('eventId');
    res.status(200).json(bookings);
}

exports.cancelBooking = async (req, res) => {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
        return res.status(404).json({ message: 'Booking not found' });
    }
    if (req.user.role !== 'admin' && booking.userId.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'You are not authorized to cancel this booking' });
    }
    if (booking.status === 'cancelled') {
        return res.status(400).json({ message: 'Booking is already cancelled' });
    }
    const previousStatus = booking.status;
    booking.status = 'cancelled';
    await booking.save();
    if (previousStatus === 'confirmed') {
        await Event.findByIdAndUpdate(booking.eventId, { $inc: { availableSeats: 1 } });
    }
    res.status(200).json({ message: 'Booking canceled' });
}