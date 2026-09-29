const Event = require('../models/Event');

exports.getAllEvents = async (req, res) => {
    try {
        const filters = {};
        if(req.query.category){
            filters.category = req.query.category;
        }
        if(req.query.ticketPrice){
            filters.ticketPrice = req.query.ticketPrice;
        }
        if (req.query.search) {
            filters.title = { $regex: req.query.search, $options: 'i' };
        }

        const events = await Event.find(filters).sort({ date: 1 });
        res.status(200).json(events);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json(event);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createEvent = async (req, res) => {
    const { title, description, date, location, category, totalSeats, ticketPrice, imageUrl } = req.body;
    try {
        const seatCount = Number(totalSeats);
        const price = Number(ticketPrice);
        const eventDate = new Date(date);
        if (!Number.isFinite(seatCount) || seatCount < 1 || !Number.isFinite(price) || price < 0 || Number.isNaN(eventDate.getTime())) {
            return res.status(400).json({ message: 'Enter a valid date, a positive seat count, and a non-negative ticket price' });
        }

        const newEvent = await Event.create({
            title,
            description,
            date: eventDate,
            location,
            category,
            totalSeats: seatCount,
            availableSeats: seatCount,
            ticketPrice: price,
            imageUrl: imageUrl || req.body.image,
            createdBy: req.user._id
        });
        res.status(201).json(newEvent);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateEvent = async (req, res) => {
    const { title, description, date, location, category, totalSeats, availableSeats, ticketPrice, imageUrl } = req.body;
    try {
        const updatedEvent = await Event.findByIdAndUpdate(req.params.id, {
            title,
            description,
            date,
            location,
            category,
            totalSeats,
            availableSeats,
            ticketPrice,
            imageUrl: imageUrl || req.body.image,
        }, { new: true });
        if (!updatedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json(updatedEvent);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteEvent = async (req, res) => {
    try {
        const deletedEvent = await Event.findByIdAndDelete(req.params.id);
        if (!deletedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json({ message: 'Event deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};