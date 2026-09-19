import { FaArrowRight, FaSearch } from "react-icons/fa";

const Hero = ({ search, setSearch }) => (
  <section className="relative 
  grid min-h-[75vh] 
  place-items-center 
  overflow-hidden 
  bg-[linear-gradient(180deg,#110926ad,#1109263c),url('/home-bg.jpg')] 
  bg-cover
  bg-fixed bg-center text-center 
  md:min-h-[100vh]">
    <div className="relative z-[1] max-w-[100vw] px-5 py-[136px]"
    >
      <span className="inline-block rounded-[30px] border border-[#d200d8] bg-[linear-gradient(90deg,#D200D850,#4C008750)] px-5 py-1.5 text-4 font-semibold max-[700px]:px-3 max-[700px]:py-1 max-[700px]:text-3">
        Welcome to Eventify
      </span>
      <h1 className="my-9 text-[clamp(36px,5vw,72px)] font-extrabold uppercase leading-[1] md:leading-[0.8] max-[700px]:my-6">
        Find your next
        <br />
        <span className="text-[#d200d8]">unforgettable</span>
        <br />
        experience
      </h1>
      <p className="mx-auto mb-9 max-w-[90%] text-[12px] leading-[1.6] text-white sm:max-w-[50%] md:text-[18px]">
        Discover the best tech conferences, late-night music festivals, and
        hands-on workshops happening directly in your area. Secure your spot
        today.
      </p>
      <label className="mx-auto flex max-w-[90%] items-center gap-2 rounded-full border-2 border-[#d200d8] bg-white px-4 py-2 text-[#d200d8] sm:max-w-[50%] md:px-8 md:py-4">
        <FaSearch aria-hidden="true" className="text-[18px] md:text-[24px]" />
        <input
          className="min-w-0 flex-1 border-0 text-[18px] text-[#333] outline-0 max-[700px]:text-[12px]"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search for your event..."
          aria-label="Search for an event"
        />
        <span className="flex items-center gap-2 rounded-[20px] bg-[#d200d8] px-6 py-2 text-[14px] font-semibold text-white hover:bg-gradient-to-r hover:from-[#d200d8] hover:to-[#4c0087] max-[700px]:px-4 max-[700px]:py-2 max-[700px]:text-[12px]">
          Explore <FaArrowRight aria-hidden="true" />
        </span>
      </label>
    </div>

    <div
    className="pointer-events-none absolute
    -bottom-[20rem]
    sm:-bottom-[30rem]
    left-1/2
    z-[1]
    h-[400px]
    w-[120vw]
    sm:h-[600px]
    sm:w-[120vw]
    -translate-x-1/2
    rounded-[50%]
    bg-[#110926]
    "
    />
  </section>
);

export default Hero;
