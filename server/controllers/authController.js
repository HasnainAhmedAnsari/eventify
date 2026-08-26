const User = require('../models/User');
const OTP = require('../models/OTP');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sentOTPEmail } = require('../utils/email');

const generateToken = (id, role) => {
    return jwt.sign({id, role}, process.env.JWT_SECRET, {expiresIn: '7d'});
}

// Register User
exports.registerUser = async(req, res) =>{
    const {name, email, password} = req.body;

    let userExists = await User.findone({email});
    if(userExists){
        return res.status(400).json({error: 'User already exists'});
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    try{
        const user = new User.create({name, email, password: hashedPassword, role: 'user', isVerified: false});
        
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        console.log(`OTP for ${email} : ${otp}`);
        await OTP.create({email, otp, action: 'account_verification'});
        await sentOTPEmail(email, otp, 'account_verification');

        res.status(201).json({
            message: 'User registered successfully. Please check you email for OTP to verify your account.',
            email: user.email
        });

    } catch(error){
        res.status(400).json({error: error.message});
    }
};

// Login User
exports.loginUser = async(req, res) =>{
    const {email, password} = req.body;

    let user = await User.findone({email});
    if(!user){
        return res.status(400).json({error: 'User does not exist please Sign up first'});
    }

    let isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.status(400).json({error: 'Invalid credentials'});
    }

    if(!user.isVerified && user.role === 'user'){
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        await OTP.deleteMany({email, action: 'account_verification'}); // remove old OTPs
        await OTP.create({email, otp, action: 'account_verification'});
        await sentOTPEmail(email, otp, 'account_verification');

        res.status(201).json({
            message: 'Account not verified. A new OTP has sent to your email.',
            email: user.email
        });
    }

    res.json({
        message: 'Login Successful',
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id, user.role)
    })

};

// Verify OTP
exports.verifyOTP = async(req, res) =>{
    const {email, otp} = req.body;
    const otpRecord = await OTP.findone({email, otp, action: 'account_verification'});
    
    if(!otpRecord){
        return res.status(400).json({error: 'Invalid or expired OTP'});
    }

    const user = await User.findOneAndUpdate({email}, {isVerified: true})
    await OTP.deleteMany({email, otp, action: 'account_verification'}); //Remove used OTPs

    res.json({
        message: 'Account verified Successfu;ly. You can now log in.',
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id, user.role)
    })

};