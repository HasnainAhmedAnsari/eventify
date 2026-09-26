import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [showOTP, setShowOTP] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { register, verifyOTP } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            if (!showOTP) {
                await register(name, email, password);
                setShowOTP(true);
                setError('');
            } else {
                await verifyOTP(email, otp);
                navigate('/dashboard');
            }
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section
        className="
        relative
        h-[100vh]
        overflow-hidden 
        bg-[linear-gradient(0deg,#110926,#11092690),url('/home-bg.jpg')]
        bg-cover
        bg-fixed
        bg-center
        "
        >

        
        <div className="max-w-[90vw]
        sm:max-w-[420px]
        w-full
        p-8
        mx-auto
        bg-[linear-gradient(180deg,#ffffff20,#ffffff05)]
        backdrop-blur-[12px]
        text-white
        rounded-2xl
        shadow-2xl
        overflow-hidden
        mt-28
        md:mt-36
        border-[2px]
        border-[#ffffff20]
        ">
            <div className="text-center mb-8">
                <h2 className="text-[28px]
                        md:text-[36px]
                        font-bold
                        text-[#D200D8]
                        mb-0
                        md:mb-[2px]
                        ">Create an Account</h2>
                <p className="text-[14px]
                    md:text-[16px]
                    text-white
                    ">Join Eventora today</p>
            </div>

            {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-center shadow-inner border border-red-100">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                {!showOTP ? (
                    <>
                        <div>
                            <label className="block text-[12px] md:text-[14px] font-regular text-white mb-2">Full Name</label>
                            <input
                                type="text"
                                required
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-700 transition shadow-sm"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-[12px] md:text-[14px] font-regular text-white mb-2">Email Address</label>
                            <input
                                type="email"
                                required
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-700 transition shadow-sm"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-[12px] md:text-[14px] font-regular text-white mb-2">Password</label>
                            <input
                                type="password"
                                required
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-700 transition shadow-sm"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </>
                ) : (
                    <div>
                        <p className="text-sm text-green-700 bg-green-50 p-3 mb-4 rounded border border-green-200">
                            An OTP has been sent to your email. Please verify your account.
                        </p>
                        <label className="block text-[12px] md:text-[14px] font-regular text-white mb-2">Verification Code (OTP)</label>
                        <input
                            type="text"
                            required
                            placeholder="6-digit code"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-700 transition shadow-sm font-bold tracking-widest text-center text-lg"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            maxLength="6"
                        />
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="
                    w-full
                    rounded-[8px]
                    bg-[#d200d8]
                    px-2 py-4
                    text-[16px]
                    font-semibold
                    text-white 
                    hover:bg-gradient-to-r 
                    hover:from-[#d200d8]
                    hover:to-[#4c0087] 
                    max-[700px]:px-4 
                    max-[700px]:text-[14px]
                    transition
                    "
                >
                    {loading ? 'Processing...' : (showOTP ? 'Verify & Complete' : 'Sign Up')}
                </button>
            </form>

            {!showOTP && (
                <p className="text-center text-[14px] md:text-[16px] font-regular mt-4 md:mt-6 text-white">
                    Already have an account? <Link to="/login" className="text-[#d200d8] font-semibold hover:underline">Sign in</Link>
                </p>
            )}
        </div>

        </section>
    );
};

export default Register;