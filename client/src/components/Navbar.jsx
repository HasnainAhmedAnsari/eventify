import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

const navLinkClass = (active) =>
  `border-b-2 pb-1 ${active ? "border-[#d200d8] text-[#d200d8]" : "border-transparent text-white hover:text-[#d200d8]"}`;

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const close = () => setOpen(false);
  const handleLogout = () => {
    logout();
    close();
    navigate("/login");
  };
  const isHomeActive = location.pathname === "/" && location.hash !== "#events";
  const isEventsActive = location.pathname === "/" && location.hash === "#events";
  const isDashboardActive = location.pathname === (user?.role === "admin" ? "/admin" : "/dashboard");

  useEffect(() => {
    if (location.hash) {
      document.getElementById(location.hash.slice(1))?.scrollIntoView({ behavior: "smooth" });
    } else if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location.pathname, location.hash]);

  return (
    <>
      <nav className="fixed 
      left-1/2 
      top-5 
      z-20
      flex 
      w-[min(92%,940px)] 
      -translate-x-1/2 
      items-center 
      justify-between 
      rounded-[40px] 
      border 
      border-white/30 
      bg-[#1a1328]/75 
      px-12 
      py-5
      backdrop-blur-[12px] 
      max-[700px]:top-4 
      max-[700px]:py-4 
      max-[700px]:px-8"
      >
        <Link to="/" className="block" onClick={close}>
          <img src="/logo-white.svg" alt="Eventify" className="block w-20 max-[700px]:w-[70px]" />
        </Link>
        <button
          className="hidden border-0 bg-transparent text-lg text-white max-[700px]:block"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
        <div className={`${open ? "flex" : "hidden"} fixed right-[-12px] top-[58px] z-20 w-[210px] flex-col items-stretch gap-[18px] rounded-xl border border-[#70008d] bg-[#1a0c2e] p-[22px] text-sm shadow-[0_15px_35px_#0008] min-[701px]:static min-[701px]:z-auto min-[701px]:flex min-[701px]:w-auto min-[701px]:flex-row min-[701px]:items-center min-[701px]:gap-8 min-[701px]:border-0 min-[701px]:bg-transparent min-[701px]:p-0 min-[701px]:shadow-none`}>
          <Link className={navLinkClass(isHomeActive)} to="/" onClick={close}>
            Home
          </Link>
          <Link className={navLinkClass(isEventsActive)} to="/#events" onClick={close}>
            Events
          </Link>
          {user ? (
            <>
              <Link
                to={user.role === "admin" ? "/admin" : "/dashboard"}
                className={navLinkClass(isDashboardActive)}
                onClick={close}
              >
                Dashboard
              </Link>
              <button className="border-0 border-b-2 border-transparent bg-transparent pb-1 text-left text-inherit text-white hover:text-[#d200d8]" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link className={navLinkClass(location.pathname === "/login")} to="/login" onClick={close}>
                Login
              </Link>
              <Link to="/register" className={`rounded-lg bg-[#d200d8] px-[23px] py-2 text-center font-semibold text-white hover:bg-gradient-to-r hover:from-[#d200d8] hover:to-[#4c0087] ${location.pathname === "/register" ? "underline decoration-[#d200d8] underline-offset-4" : ""}`} onClick={close}>
                Signup
              </Link>
            </>
          )}
        </div>
      </nav>
      {open && (
        <button
          className="fixed inset-0 z-[15] border-0 bg-transparent"
          onClick={close}
          aria-label="Close menu"
        />
      )}
    </>
  );
};

export default Navbar;
