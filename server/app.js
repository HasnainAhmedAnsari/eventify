const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const dns = require('node:dns');
const path = require('node:path');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/events');
const bookingRoutes = require('./routes/booking');

dotenv.config({ path: path.join(__dirname, '.env') });

const dnsServers = (process.env.DNS_SERVERS || '')
    .split(',')
    .map(server => server.trim())
    .filter(Boolean);
if (dnsServers.length > 0) {
    dns.setServers(dnsServers);
} else if (dns.getServers().every(server => server === '127.0.0.1' || server === '::1')) {
    dns.setServers(['8.8.8.8', '1.1.1.1']);
}

const app = express();
let connectionPromise;

const connectDB = async () => {
    if (mongoose.connection.readyState === 1) {
        return;
    }

    if (!connectionPromise || mongoose.connection.readyState === 0) {
        connectionPromise = mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000,
            autoIndex: true,
        }).catch(error => {
            connectionPromise = null;
            throw error;
        });
    }

    await connectionPromise;
};

app.use(cors());
app.use(express.json());
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        res.status(503).json({ message: 'Database connection unavailable' });
    }
});

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/booking', bookingRoutes);

module.exports = app;