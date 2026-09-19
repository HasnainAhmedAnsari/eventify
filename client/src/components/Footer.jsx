import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="mx-auto grid max-w-[75vw]
  grid-cols-[1fr_auto]
  gap-x-20
  gap-y-5
  px-[30px]
  py-18
  max-[700px]:block
  max-[700px]:px-5
  max-[700px]:pb-[25px]
  max-[700px]:pt-[45px]
  ">
    <div>
      <img src="/logo-pink.svg" alt="Eventify" className="w-42 max-[700px]:w-32" />
      <p className="mt-4 
      max-w-[30rem]
      text-[12px]
      md:text-[16px]
      leading-[1.2]
      text-white
      ">The simplest, most dynamic way to manage, discover, and host world-class events in your local city. Let&apos;s make memories together.</p>
    </div>
    <nav className="flex 
    gap-7 
    self-center 
    text-[16px]
    max-[700px]:my-[25px] 
    max-[700px]:justify-between 
    max-[700px]:gap-2.5 
    max-[700px]:text-[12px]">
      <Link to="/" className="hover:text-[#d200d8]">Home</Link>
      <a href="#events" className="hover:text-[#d200d8]">Events</a>
      <Link to="/login" className="hover:text-[#d200d8]">Login</Link>
      <Link to="/register" className="hover:text-[#d200d8]">Signup</Link>
    </nav>
    <div className="col-span-full
    border-t-[2px]
    border-white/50 
    pt-[22px] 
    text-center 
    text-[12px] 
    text-[#c9bdd8] 
    max-[700px]:block 
    max-[700px]:pt-[15px] 
    max-[700px]:text-[10px]">© All rights reserved to Eventify since 2026.</div>
  </footer>
);

export default Footer;
