import React from 'react';
import { Link } from 'react-router-dom';
import { FaTimesCircle } from 'react-icons/fa';

const PaymentFailed = () => {
    return (
        <section className="
        relative 
  grid min-h-[100vh] 
  place-items-center 
  overflow-hidden 
  bg-[linear-gradient(180deg,#110926,#11092690),url('/home-bg.jpg')] 
  bg-cover
  bg-fixed bg-center text-center 
  md:min-h-[100vh]
  p-4
        ">
            <div className="
            bg-[linear-gradient(180deg,#ffffff20,#ffffff05)]
            backdrop-blur-[12px]
            border-[2px]
            border-red-500/20
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
            border-t-red-500
            transform 
            transition-all 
            hover:-translate-y-1
            ">
                <FaTimesCircle className="text-red-500 text-7xl mx-auto mb-6 drop-shadow-sm" />
                <h1 className="
                text-[28px]
                        md:text-[36px]
                        font-bold
                        text-white
                        mb-2
                        md:mb-4
                        leading-[1.2]
                ">Booking Failed</h1>
                <p className="
                text-[14px]
                    md:text-[16px]
                    text-white
                    mb-6
                    md:mb-8
                ">We couldn't process your payment. Please ensure your payment details are correct and try again.</p>
                <div className="space-y-2 md:space-y-4">
                    <Link to="/" className="block w-full bg-red-500 hover:bg-red-600 text-white text-[14px] md:text-[18px] font-semibold py-4 px-6 rounded-xl transition shadow-lg hover:shadow-xl">
                        Return to Events
                    </Link>
                    <Link to="/dashboard" className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-[14px] md:text-[18px] font-semibold py-4 px-6 rounded-xl transition">
                        Go to Dashboard
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default PaymentFailed;