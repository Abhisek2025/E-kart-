import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { verifyEmail } from "../emailVerify/verifyEmail.js";
import { json, response } from "express";
import { Session } from "../models/sessionModel.js";
import { sendOTPMail } from "../emailVerify/sendOTPMail.js";
//for register
export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    //validation
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All Fileds are required",
      });
    }

    //check User exist or not
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User Already Exist",
      });
    }
    //hashed Password for security Reason
    const hashedPassword = await bcrypt.hash(password, 10);

    //Createnew user
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY, {
      expiresIn: "10m",
    });

    newUser.token = token;
    await newUser.save();

    verifyEmail(token, email); //send email here

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//for Verification of the User
export const verify = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(400).json({
        success: false,
        message: "Authroization token is missing or Invalid",
      });
    }
    const token = authHeader.split(" ")[1];
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.SECRET_KEY);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(400).json({
          success: false,
          message: "The registration token has expired",
        });
      }
      return res.status(400).json({
        success: false,
        message: "Token Verification Failed",
      });
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    user.token = null;
    user.isVerified = true;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Email veriflied Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//if webtoken expires in 10 min then reverify

export const reVerify = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User Not Found",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "30m",
    });

    user.token = token;
    await user.save();
    verifyEmail(token, email); //Send Email Here

    return res.status(200).json({
      success: true,
      message: "Verification email sent again successfully",
      token: user.token,
    });
  } catch (error) {
    return res.status(500).json({
      succes: false,
      message: " error.message",
    });
  }
};

//logged-In User

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // 2️⃣ Check if user exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }

    // 3️⃣ Compare entered password with hashed password (DO NOT REMOVE)
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // 4️⃣ Check if email is verified
    if (!existingUser.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Please verify your account before logging in",
      });
    }

    // 5️⃣ Generate JWT tokens
    const accessToken = jwt.sign(
      { id: existingUser._id },
      process.env.SECRET_KEY,
      { expiresIn: "10d" }
    );

    const refreshToken = jwt.sign(
      { id: existingUser._id },
      process.env.SECRET_KEY,
      { expiresIn: "30d" }
    );

    // 6️⃣ Update login status
    existingUser.isLoggedIn = true;
    await existingUser.save();

    // 7️⃣ Handle session (single active session)
    const existingSession = await Session.findOne({
      userId: existingUser._id,
    });

    if (existingSession) {
      await Session.deleteOne({ userId: existingUser._id });
    }

    await Session.create({ userId: existingUser._id });

    // 8️⃣ Remove password before sending response (security)
    existingUser.password = undefined;

    // 9️⃣ Send response
    return res.status(200).json({
      success: true,
      message: `Welcome back ${existingUser.firstName}`,
      user: existingUser,
      accessToken,
      refreshToken,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// for Logout logic
  export const logout= async(req,res)=>{
    try{
      const userId = req.id
      // delete all active sessions of user
      await Session.deleteMany({userId})
       // update login status instead of deleting user
      await User.findByIdAndUpdate(userId, {isLoggedIn: false});
      return res.status(200).json({
        success:true,
        message:"User Loggedout Successfully"
      })
    } catch(error){
      return res.status(500).json({
        success: false,
        message:error.message,
      })
    }
  };

  //Forgot Password
  export const forgotPassword = async(req,res)=>{
    try{
      const {email} = req.body;
      const user = await User.findOne({email});
      if(!user){
        return res.status(401).json({
          succes:false,
          message: "User Not Found"
        });
      }
      const otp = Math.floor(100000 + Math.random()*900000).toString()
      const otpExpiry = new Date(Date.now()+10*60*1000)
      user.otp = otp
      user.otpExpiry = otpExpiry

      await user.save();
      await sendOTPMail(otp, email)


      return res.status(200).json({
        succes:true,
        message:"Otp Sent to Email successfully"
      })

    } catch(error){
      return res.status(500).json({
        succes: false,
        message: error.message
      })
    }
  }

  //verify OTP
  export const verifyOTP = async(req,res)=>{
    try{
      const {otp, email} = req.body;
      
      if(!otp || !email){
        return res.status(400).json({
          success:false,
         message: "OTP and email are required",
        });
      }
      const user = await User.findOne({email})
      if(!user){
        return res.status(400).json({
          success: false,
          message: 'User not Found',
        });
      }
      if(!user.otp || !user.otpExpiry){
        return res.status(400).json({
          success: false,
         message: "OTP is not generated or already verified",
        })
      }
      if(user.otpExpiry < new Date()){
        return res.status(400).json({
          success: false,
          message:"Otp has expired Please request the new One",
        })
      }
      if(String(otp) !== String(user.otp)){
        return res.status(400).json({
          succes: false,
          message:'OTP is invalid',
        });
      }
      // ✅ OTP verified
      user.otp = null;
      user.otpExpiry = null;
      user.isVerified = true;
      await user.save();

      return res.status(200).json({
        success: true,
        message: "OTP verified Successfully",
      });



    } catch(error){
      return res.status(500).json({
        success:false,
        message:"error.message",
      });

    }
  };

  //Change Password

  export const changePassword = async(req,res)=>{
    try{
      const{ newPassword, confirmPassword, email} = req.body;
      if (!newPassword || !confirmPassword || !email) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
     if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }
    const user= await User.findOne({email});
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    } 

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();
      return res.status(200).json({
        success: true,
        message:"Password Changed SUccessfully",
      });

    }  catch(error){
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  //All User By Admin Section
  export const allUser = async (req, res) => {
  try {
    const users = await User.find().select("-password -otp -otpExpiry");

    return res.status(200).json({
      success: true,
      count: users.length,
      users,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Admin Access to all User
export const getUserById= async(req,res)=>{
  try{
    const{userId}= req.params; 
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    const user = await User.findById(userId).select("-password -otp -otpExpiry -token");

    if(!user){
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }
    res.status(200).json({
      success: true,
      user,
    });

  } catch(error){
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}








