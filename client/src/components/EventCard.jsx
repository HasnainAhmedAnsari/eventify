import { Link } from "react-router-dom";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { FiMapPin, FiArrowUpRight  } from "react-icons/fi";

const formatDate = (date) =>
  new Date(date).toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const EventCard = ({ event }) => {
  const image = event.imageUrl || event.image;
  const availability = event.totalSeats
    ? Math.max(
        0,
        Math.min(100, (event.availableSeats / event.totalSeats) * 100),
      )
    : 0;

  return (
    <article
      className="overflow-hidden
      rounded-[18px]
      md:rounded-[24px]
      border border-2 border-[#D200D8] 
      bg-gradient-to-br from-[#D200D8]/20 to-[#4C0087]/20
      "
      key={event._id}
    >
      <div className="relative 
      h-[236px]
      sm:h-[186px]
      lg:h-[252px] 
      p-2">
        {image ? (
          <img
            src={image}
            alt={event.title}
            className="h-full w-full
            rounded-[12px]
      md:rounded-[16px]
      object-cover
      "
          />
        ) : (
          <div className="
          grid
          h-full
          w-full
          place-items-center
          rounded-[8px]
      md:rounded-[12px]
          bg-[#4c0087]">
            {event.category}
          </div>
        )}
        <span className="absolute 
        right-5 top-5 
        rounded-full
        bg-gradient-to-br from-[#D200D8]/50 to-[#4C0087]/75 
        px-3 py-1 
        text-[12px]
        md:text-[14px]
        ">
          {event.ticketPrice === 0 ? "FREE" : `${event.ticketPrice}/-`}
        </span>
      </div>

      <div className="p-5">
        <span className="
        text-[12px] 
        md:text-[16px] 
        uppercase"
        >{event.category}
        </span>

        <h3 className="
        mt-[4px]
        mb-[12px]
        text-[18px]
        md:text-[24px]
        font-semibold
        leading-[1.1]
        text-[#d200d8]
        ">
          {event.title}
        </h3>

        <div className="grid 
        gap-[8px] 
        ">
          <span className="flex items-center gap-[8px] md:gap-[12px] 
          text-[10px]
        md:text-[12px] ">
            <RiCalendarScheduleLine className="text-[#d200d8] 
            text-[14px]
        md:text-[18px] " />
            {formatDate(event.date)}
          </span>
          <span className="flex items-center gap-[8px] md:gap-[12px] 
          text-[10px]
        md:text-[12px]">
            <FiMapPin className="text-[#d200d8] 
            text-[14px]
        md:text-[18px] " />
            {event.location}
          </span>
        </div>
        <div className="my-4 h-2 rounded-[5px] bg-[#59006f]">
          <span
            className="block h-full rounded-[inherit] bg-[#d200d8]"
            style={{ width: `${availability}%` }}
          />
        </div>
        <div className="text-[10px]">
          {event.availableSeats} of {event.totalSeats} seats remaining
        </div>
        <Link
          to={`/events/${event._id}`}
          className="mt-2 
          flex 
          items-center 
          justify-center 
          gap-2 
          rounded-[12px]
      md:rounded-[16px]
          bg-[#d200d8]
          hover:bg-gradient-to-r hover:from-[#D200D8] hover:to-[#4C0087] 
          py-[12px] 
          text-[12px] 
          md:text-[16px] 
          font-semibold
          "
        >
          View Details <FiArrowUpRight className="text-[18px] md:text-[24px]" />
        </Link>
      </div>
    </article>
  );
};

export default EventCard;
