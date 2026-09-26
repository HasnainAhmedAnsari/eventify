import { useEffect, useState } from "react";
import api from "../utils/axios";
import Events from "../components/Events";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import WhyChooseUs from "../components/WhyChooseUs";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      try {
        const { data } = await api.get(
          `/events?search=${encodeURIComponent(search)}`,
        );
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [search]);

  return (
    <div className="bg-[#110926] text-white">
      <Hero search={search} setSearch={setSearch} />
      <Events events={events} loading={loading} />
      <WhyChooseUs />
      <Footer/>
    </div>
  );
};

export default Home;
