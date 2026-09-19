import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

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
  const homeLink = location.pathname === "/" ? "#events" : "/";

  return (
    <>
      <nav className="absolute left-1/2 top-5 z-20 flex h-[58px] w-[min(92%,940px)] -translate-x-1/2 items-center justify-between rounded-[40px] border border-white/30 bg-[#1a1328]/75 px-6 pl-[34px] backdrop-blur-[12px] max-[700px]:top-4 max-[700px]:h-12 max-[700px]:px-4">
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
          <a className="text-white hover:text-[#d200d8]" href={homeLink} onClick={close}>
            Home
          </a>
          <a className="text-white hover:text-[#d200d8]" href={homeLink} onClick={close}>
            Events
          </a>
          {user ? (
            <>
              <Link
                to={user.role === "admin" ? "/admin" : "/dashboard"}
                className="text-white hover:text-[#d200d8]"
                onClick={close}
              >
                Dashboard
              </Link>
              <button className="border-0 bg-transparent text-left text-inherit text-white hover:text-[#d200d8]" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link className="text-white hover:text-[#d200d8]" to="/login" onClick={close}>
                Login
              </Link>
              <Link to="/register" className="rounded-lg bg-gradient-to-r from-[#d200d8] to-[#4c0087] px-[23px] py-2 font-bold text-white" onClick={close}>
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
