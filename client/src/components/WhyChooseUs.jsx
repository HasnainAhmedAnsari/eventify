import { FaRegClock, FaShieldAlt, FaTicketAlt } from "react-icons/fa";

const features = [
  { icon: FaRegClock, title: "Fast Booking", text: "Secure your tickets instantly with our fast streamlined booking infrastructure built for speed." },
  { icon: FaTicketAlt, title: "Seamless Access", text: "Download tickets instantly or manage them right from your personal dashboard with ease." },
  { icon: FaShieldAlt, title: "Secure Platform", text: "All transactions and registrations are protected by modern security and 2FA OTP technology." },
];

const WhyChooseUs = () => (
  <section className="bg-[linear-gradient(rgba(17,9,38,.76),rgba(17,9,38,.92)),url('/why-choose-us-bg.jpg')] bg-cover bg-center px-[30px] pb-[120px] pt-[100px] text-center max-[700px]:pb-[60px] max-[700px]:pt-[50px]">
    <div className="mx-auto max-w-[550px]">
      <h2 className="m-0 text-[26px] font-extrabold uppercase text-[#d200d8] max-[700px]:text-base">Why choose us?</h2>
      <p className="my-3 mb-[35px] text-[12px] text-[#eee8f4] max-[700px]:text-[9px] max-[700px]:leading-[1.3]">Discover experiences worth remembering, with simple booking and thoughtful support from start to finish.</p>
    </div>
    <div className="mx-auto grid max-w-[800px] grid-cols-3 gap-3 max-[700px]:max-w-[220px] max-[700px]:grid-cols-1 max-[700px]:gap-2.5">
      {features.map(({ icon: Icon, title, text }) => (
        <div className="min-h-[165px] rounded-[10px] border border-[#82009d] bg-[#260e3a]/65 p-[18px] max-[700px]:min-h-[145px]" key={title}>
          <div className="mx-auto mb-3 grid h-[52px] w-[52px] place-items-center rounded-[14px] bg-gradient-to-br from-[#d200d8] to-[#4c0087] text-[26px]"><Icon /></div>
          <h3 className="mb-[7px] text-[13px] font-semibold uppercase text-[#d200d8]">{title}</h3>
          <p className="m-0 text-[10px] leading-[1.4]">{text}</p>
        </div>
      ))}
    </div>
  </section>
);

export default WhyChooseUs;
