import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="mx-auto grid max-w-[1080px] grid-cols-[1fr_auto] gap-x-20 gap-y-5 px-[30px] pb-[35px] pt-[65px] max-[700px]:block max-[700px]:px-5 max-[700px]:pb-[25px] max-[700px]:pt-[45px]">
    <div>
      <img src="/logo-pink.svg" alt="Eventify" className="w-[125px] max-[700px]:w-[105px]" />
      <p className="max-w-[330px] text-[11px] leading-[1.5] text-[#eee8f4] max-[700px]:text-[9px]">The simplest, most dynamic way to manage, discover, and host world-class events in your local city. Let&apos;s make memories together.</p>
    </div>
    <nav className="flex gap-7 self-center text-xs max-[700px]:my-[25px] max-[700px]:justify-between max-[700px]:gap-2.5 max-[700px]:text-[9px]">
      <Link to="/" className="hover:text-[#d200d8]">Home</Link>
      <a href="#events" className="hover:text-[#d200d8]">Events</a>
      <Link to="/login" className="hover:text-[#d200d8]">Login</Link>
      <Link to="/register" className="hover:text-[#d200d8]">Signup</Link>
    </nav>
    <small className="col-span-full border-t border-white/25 pt-[22px] text-center text-[10px] text-[#c9bdd8] max-[700px]:block max-[700px]:pt-[15px] max-[700px]:text-[7px]">© {new Date().getFullYear()} Eventify Platform. All rights reserved.</small>
  </footer>
);

export default Footer;
