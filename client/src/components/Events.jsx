import { Link } from "react-router-dom";
import { FaArrowRight, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

const formatDate = (date) =>
  new Date(date).toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const Events = ({ events, loading }) => (
  <section className="relative z-[2] mx-auto -mt-[25px] max-w-[1080px] rounded-[48%_48%_12%_12%/5%_5%_4%_4%] bg-[#110926] px-[30px] pb-[90px] pt-[70px] max-[700px]:-mt-3 max-[700px]:rounded-[45%_45%_8%_8%/3%_3%_2%_2%] max-[700px]:px-[13px] max-[700px]:pb-[60px] max-[700px]:pt-10" id="events">
    <div className="flex items-center justify-between gap-5 border-b border-white/25 pb-[13px]">
      <h2 className="m-0 text-[26px] font-extrabold uppercase text-[#d200d8] max-[700px]:text-base">Upcoming events</h2>
      <span className="text-[11px] max-[700px]:text-[8px]">{events.length} results found</span>
    </div>
    {loading ? (
      <p className="py-[70px] text-center text-[#c9bdd8]">Loading events...</p>
    ) : events.length === 0 ? (
      <p className="py-[70px] text-center text-[#c9bdd8]">No events found matching your search.</p>
    ) : (
      <div className="mt-7 grid grid-cols-3 gap-[14px] max-[700px]:mt-[17px] max-[700px]:grid-cols-1 max-[700px]:gap-2">
        {events.map((event) => {
          const image = event.imageUrl || event.image;
          const availability = event.totalSeats
            ? Math.max(0, Math.min(100, (event.availableSeats / event.totalSeats) * 100))
            : 0;
          return (
            <article className="overflow-hidden rounded-[9px] border border-[#7700a0] bg-gradient-to-br from-[#4c0087]/55 to-[#1b0931]/95" key={event._id}>
              <div className="relative h-[138px] p-1.5 max-[700px]:h-[132px]">
                {image ? <img src={image} alt={event.title} className="h-full w-full rounded-md object-cover" /> : <div className="grid h-full w-full place-items-center rounded-md bg-[#4c0087]">{event.category}</div>}
                <span className="absolute right-3 top-3 rounded-[10px] bg-[#4c0087] px-2 py-0.5 text-[9px]">{event.ticketPrice === 0 ? "FREE" : `₹${event.ticketPrice}`}</span>
              </div>
              <div className="p-[5px_9px_10px]">
                <span className="text-[9px] uppercase">{event.category}</span>
                <h3 className="my-[3px] mb-[9px] min-h-[34px] text-[14px] font-semibold leading-[1.1] text-[#d200d8] max-[700px]:text-[13px]">{event.title}</h3>
                <div className="grid gap-[5px] text-[8px]">
                  <span className="flex items-center gap-[7px]"><FaCalendarAlt className="text-[#d200d8]" />{formatDate(event.date)}</span>
                  <span className="flex items-center gap-[7px]"><FaMapMarkerAlt className="text-[#d200d8]" />{event.location}</span>
                </div>
                <div className="my-2 h-1.5 rounded-[5px] bg-[#59006f]"><span className="block h-full rounded-[inherit] bg-[#d200d8]" style={{ width: `${availability}%` }} /></div>
                <small className="text-[7px]">{event.availableSeats} of {event.totalSeats} seats remaining</small>
                <Link to={`/events/${event._id}`} className="mt-2 flex items-center justify-center gap-2 rounded-[7px] bg-[#d200d8] p-[7px] text-[11px] font-bold">View Details <FaArrowRight /></Link>
              </div>
            </article>
          );
        })}
      </div>
    )}
  </section>
);

export default Events;
