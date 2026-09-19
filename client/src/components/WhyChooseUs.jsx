import { FaRegClock, FaShieldAlt, FaTicketAlt } from "react-icons/fa";

const features = [
  {
    icon: FaRegClock,
    title: "Fast Booking",
    text: "Secure your tickets instantly with our fast streamlined booking infrastructure built for speed.",
  },
  {
    icon: FaTicketAlt,
    title: "Seamless Access",
    text: "Download tickets instantly or manage them right from your personal dashboard with ease.",
  },
  {
    icon: FaShieldAlt,
    title: "Secure Platform",
    text: "All transactions and registrations are protected by modern security and 2FA OTP technology.",
  },
];

const WhyChooseUs = () => (
  <section className="
  bg-[linear-gradient(180deg,#11092650,#110926),url('/why-choose-us-bg.jpg')] 
  text-center
  relative
  place-items-center 
  overflow-hidden
  bg-cover
  bg-fixed
  bg-center
  text-center 
  min-h-[100vh]
  ">
    <div
    className="pointer-events-none absolute
    -top-[20rem]
    sm:-top-[28rem]
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

    <div className="
    mt-36
    sm:mt-48 
    md:mt-64 
    mb-9
    mx-auto
    
    ">
      <h2 className="m-0
      text-[24px]
      md:text-[36px]
      lg:text-[48px]
      font-extrabold uppercase text-[#d200d8]
      max-w-[75vw]
    md:max-w-[50vw]
      ">
        Why choose us?
      </h2>
      <p className="my-2
      text-[12px] 
      md:text-[18px] 
      text-white 
      max-w-[75vw]
    md:max-w-[50vw]
    lg:max-w-[40vw]
      ">
        Discover experiences worth remembering, with simple booking and
        thoughtful support from start to finish.
      </p>
    </div>
    <div className="mx-auto
    grid
    mb-9
    max-w-[75vw]
    grid-cols-1
    sm:grid-cols-3
    gap-4
    ">
      {features.map(({ icon: Icon, title, text }) => (
        <div
          className="
          min-h-[10rem]
          px-6
          py-8
          rounded-[18px]
      md:rounded-[24px]
      border border-2 border-[#D200D8] 
      bg-gradient-to-br from-[#D200D8]/20 to-[#4C0087]/20
      backdrop-blur-[8px]
          "
          key={title}
        >
          <div className="mx-auto 
          mb-3 
          grid 
          h-[64px] 
          w-[64px] 
          md:h-[86px] 
          md:w-[86px] 
          place-items-center 
          rounded-full 
          bg-gradient-to-br 
          from-[#d200d8] 
          to-[#4c0087] 
          text-[28px]
          md:text-[36px]
          ">
            <Icon />
          </div>
          <h3 className="mb-[8px] 
          text-[18px] 
          md:text-[24px] 
          font-bold
          uppercase
          text-[#d200d8]">
            {title}
          </h3>
          <p className="m-0 
          text-[12px] 
          md:text-[16px] 
          leading-[1.4]">{text}</p>
        </div>
      ))}
    </div>
  </section>
);

export default WhyChooseUs;
