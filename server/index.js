const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const dns = require('node:dns')
const mongoose = require('mongoose')
const authRoutes = require('./routes/auth.js')
const eventRoutes = require('./routes/events.js')
const bookingRoutes = require('./routes/booking.js')

dotenv.config();

const dnsServers = (process.env.DNS_SERVERS || '1.1.1.1,8.8.8.8')
    .split(',')
    .map(server => server.trim())
    .filter(Boolean);
dns.setServers(dnsServers);

const app = express();
app.use(cors());
app.use(express.json());

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000,
            autoIndex: true,
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
};

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/events', eventRoutes)
app.use('/api/booking', bookingRoutes)

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log('Server is running on port: ', PORT);
});