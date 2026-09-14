import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const close = () => setOpen(false);
    const handleLogout = () => { logout(); close(); navigate('/login'); };
    const homeLink = location.pathname === '/' ? '#events' : '/';

    return <><nav className="site-nav"><Link to="/" className="brand" onClick={close}><img src="/logo-white.svg" alt="Eventify" /></Link><button className="menu-toggle" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'}>{open ? <FaTimes /> : <FaBars />}</button><div className={`nav-links ${open ? 'is-open' : ''}`}><a href={homeLink} onClick={close}>Events</a>{user ? <><Link to={user.role === 'admin' ? '/admin' : '/dashboard'} onClick={close}>Dashboard</Link><button onClick={handleLogout}>Logout</button></> : <><Link to="/login" onClick={close}>Login</Link><Link to="/register" className="nav-cta" onClick={close}>Signup</Link></>}</div></nav>{open && <button className="drawer-backdrop" onClick={close} aria-label="Close menu" />}</>;
};

export default Navbar;
