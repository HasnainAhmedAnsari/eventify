import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaMapMarkerAlt, FaSearch, FaRegClock, FaTicketAlt, FaShieldAlt, FaArrowRight } from 'react-icons/fa';
import api from '../utils/axios';

const features = [
    { icon: FaRegClock, title: 'Fast Booking', text: 'Secure your tickets instantly with our fast streamlined booking infrastructure built for speed.' },
    { icon: FaTicketAlt, title: 'Seamless Access', text: 'Download tickets instantly or manage them right from your personal dashboard with ease.' },
    { icon: FaShieldAlt, title: 'Secure Platform', text: 'All transactions and registrations are protected by modern security and 2FA OTP technology.' },
];

const formatDate = (date) => new Date(date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

const Home = () => {
    const [events, setEvents] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timeoutId = setTimeout(async () => {
            try {
                const { data } = await api.get(`/events?search=${encodeURIComponent(search)}`);
                setEvents(data);
            } catch (error) {
                console.error('Error fetching events:', error);
            } finally {
                setLoading(false);
            }
        }, 300);
        return () => clearTimeout(timeoutId);
    }, [search]);

    return (
        <div className="home-page">
            <section className="hero-section"><div className="hero-content"><span className="eyebrow">Welcome to Eventify</span><h1>Find your next<br /><span>unforgettable</span><br />experience</h1><p>Discover the best tech conferences, late-night music festivals, and hands-on workshops happening directly in your area. Secure your spot today.</p><label className="hero-search"><FaSearch aria-hidden="true" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search for your event..." aria-label="Search for an event" /><span>Explore <FaArrowRight aria-hidden="true" /></span></label></div></section>
            <section className="events-section" id="events"><div className="section-heading"><h2>Upcoming events</h2><span>{events.length} results found</span></div>{loading ? <p className="status-message">Loading events...</p> : events.length === 0 ? <p className="status-message">No events found matching your search.</p> : <div className="event-grid">{events.map((event) => { const image = event.imageUrl || event.image; const availability = event.totalSeats ? Math.max(0, Math.min(100, (event.availableSeats / event.totalSeats) * 100)) : 0; return <article className="event-card" key={event._id}><div className="event-image-wrap">{image ? <img src={image} alt={event.title} className="event-image" /> : <div className="event-image fallback-image">{event.category}</div>}<span className="price-badge">{event.ticketPrice === 0 ? 'FREE' : `₹${event.ticketPrice}`}</span></div><div className="event-card-body"><span className="event-category">{event.category}</span><h3>{event.title}</h3><div className="event-meta"><span><FaCalendarAlt />{formatDate(event.date)}</span><span><FaMapMarkerAlt />{event.location}</span></div><div className="seat-bar"><span style={{ width: `${availability}%` }} /></div><small>{event.availableSeats} of {event.totalSeats} seats remaining</small><Link to={`/events/${event._id}`} className="primary-button">View Details <FaArrowRight /></Link></div></article>; })}</div>}</section>
            <section className="features-section"><div className="features-heading"><h2>Why choose us?</h2><p>Discover experiences worth remembering, with simple booking and thoughtful support from start to finish.</p></div><div className="features-grid">{features.map(({ icon: Icon, title, text }) => <div className="feature-card" key={title}><div className="feature-icon"><Icon /></div><h3>{title}</h3><p>{text}</p></div>)}</div></section>
            <footer className="site-footer"><div><img src="/logo-pink.svg" alt="Eventify" /><p>The simplest, most dynamic way to manage, discover, and host world-class events in your local city. Let&apos;s make memories together.</p></div><nav><Link to="/">Home</Link><a href="#events">Events</a><Link to="/login">Login</Link><Link to="/register">Signup</Link></nav><small>© {new Date().getFullYear()} Eventify Platform. All rights reserved.</small></footer>
        </div>
    );
};

export default Home;
