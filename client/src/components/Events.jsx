import EventCard from "./EventCard";

const Events = ({ events, loading }) => (
  <section
    className="
    mx-auto
    max-w-[100vw]
    bg-[#110926] 
    py-[18px]
    px-[24px]
    sm:px-[36px]
    md:py-[36px]
    md:px-[136px]
    "
    id="events"
  >
    <div className="flex items-center justify-between gap-5 border-b-[4px] border-white/75 pb-[16px]">
      <h2 className="m-0 ml-2 
      text-[16px]
      sm:text-[24px]
      md:text-[36px]
      lg:text-[48px]
      font-extrabold uppercase text-[#d200d8]">
        Upcoming events
      </h2>
      <span className="text-[12px] md:text-[18px] mr-2">
        {events.length} results found
      </span>
    </div>
    {loading ? (
      <p className="py-[70px] text-center text-[#c9bdd8]">Loading events...</p>
    ) : events.length === 0 ? (
      <p className="py-[70px] text-center text-[#c9bdd8]">
        No events found matching your search.
      </p>
    ) : (
      <div className="
      mx-2
      mt-[18px]
      md:mt-[36px]
      grid
      grid-cols-1
      sm:grid-cols-2
      lg:grid-cols-3
      gap-[12px]  
      md:gap-[16px]  
      ">
        {events.map((event) => <EventCard event={event} key={event._id} />)}
      </div>
    )}
  </section>
);

export default Events;
