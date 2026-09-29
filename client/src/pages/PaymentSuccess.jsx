import React from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

const PaymentSuccess = () => {
    return (
        <section
        className="relative 
  grid min-h-[100vh] 
  place-items-center 
  overflow-hidden 
  bg-[linear-gradient(180deg,#110926,#11092690),url('/home-bg.jpg')] 
  bg-cover
  bg-fixed bg-center text-center 
  md:min-h-[100vh]
  p-4
  "
        >
            <div className="
            bg-[linear-gradient(180deg,#ffffff20,#ffffff05)]
            backdrop-blur-[12px]
            border-[2px]
            border-[#D200D820]
            p-6 
            md:p-10 
            rounded-2xl 
            md:rounded-3xl 
            shadow-xl 
            md:shadow-2xl 
            max-w-md 
            w-full 
            text-center 
            border-t-8 
            border-t-[#D200D8]
            transform 
            transition-all 
            hover:-translate-y-1
            ">
                <FaCheckCircle className="text-[#D200D8] text-7xl mx-auto mb-6 drop-shadow-sm" />
                <h1 className="
                text-[28px]
                        md:text-[36px]
                        font-bold
                        text-[#D200D8]
                        mb-2
                        md:mb-4
                        leading-[1.2]
                ">Booking Confirmed!</h1>
                <p className="
                text-[14px]
                    md:text-[16px]
                    text-white
                    mb-6
                    md:mb-8
                ">Your ticket has been booked successfully. A confirmation email has been sent to your registered email address.</p>
                <div className="space-y-2 md:space-y-4">
                    <Link to="/dashboard" className="block w-full bg-[#D200D8] hover:bg-gradient-to-r 
                    hover:from-[#d200d8]
                    hover:to-[#4c0087] 
                    text-[14px] md:text-[18px] text-white font-semibold py-4 px-6 rounded-xl transition shadow-lg hover:shadow-xl">
                        View My Tickets
                    </Link>
                    <Link to="/" className="block w-full rounded-[8px] bg-[#d200d8] px-6 py-4 text-[14px] font-semibold text-white transition hover:bg-gradient-to-r hover:from-[#d200d8] hover:to-[#4c0087] md:text-[18px]">
                        Discover More Events
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default PaymentSuccess;