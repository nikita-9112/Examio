const User = require("../models/User");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const generateToken = require("../utils/generateToken");
const sendEmail = require("../utils/sendEmail");
const { OAuth2Client } = require("google-auth-library");

const googleClient = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID
);


const register = async (req,res)=>{
  try{
    const {name, email, password} = req.body;

    

    if(!name || !email || !password){
      return res.status(400).json({
        success: false,
        message:"All fields are required"
      });
    }

    if(password.length <6){
      return res.status(400).json({
        success: false,
        message:"Password must be at least 6  characters long",
      })
    }
    
    const existingUser = await User.findOne({email : email.toLowerCase()});
    if(existingUser){
      return res.status(400).json({
        success: false,
        message: "Email already registered!!",
      });
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password:hashedPass,
    });
    const token = generateToken(user._id,user.role);

    res.status(201).json({
      success: true,
      token,
      user:{
        id:user._id,
        name:user.name,
        email:user.email,
        role: user.role
      }
    });
  }catch(error){
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


const login = async (req,res)=>{

  try{
    const {email, password} = req.body;

  const user = await User.findOne({email : email.toLowerCase()});
  
  if(!user){
    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  }

  const ismatch = await bcrypt.compare(password, user.password);

  if(!ismatch){
    return res.status(401).json({
      success:false,
      message: "Invalid credentials",
    });
  }

  const token = generateToken(user._id, user.role);

  res.status(200).json({
    success: true,
    token,
    user:{
      id:user._id,
      name:user.name,
      email:user.email,
      role:user.role
    }
  });
  }catch(error){
    res.status(500).json({
      success:false,
      message:error.message
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    // Don't reveal whether the email exists
    if (!user) {
      return res.status(200).json({
        success: true,
        message:
          "If an account exists with this email, a password reset link has been sent.",
      });
    }

    // Generate a secure random token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Hash the token before storing it in the database
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordToken = hashedToken;

    // Token will expire after 15 minutes
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    await user.save();

    // Create reset link
    const resetUrl =
      `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    // Email content
    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Reset Your Examio Password</h2>

        <p>
          We received a request to reset your Examio password.
        </p>

        <p>
          Click the button below to create a new password.
        </p>

        <a
          href="${resetUrl}"
          style="
            display: inline-block;
            padding: 12px 20px;
            background: #2563eb;
            color: white;
            text-decoration: none;
            border-radius: 6px;
          "
        >
          Reset Password
        </a>

        <p>
          This link will expire in 15 minutes.
        </p>

        <p>
          If you did not request this, you can safely ignore this email.
        </p>
      </div>
    `;

    await sendEmail({
      to: user.email,
      subject: "Reset your Examio password",
      html,
    });

    res.status(200).json({
      success: true,
      message:
        "If an account exists with this email, a password reset link has been sent.",
    });

  } catch (error) {
    console.error("Forgot password error:", error);

    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    // Hash the token received from the URL
    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    // Find user with valid token
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Reset token is invalid or has expired",
      });
    }

    // Hash the new password
    user.password = await bcrypt.hash(password, 10);

    // Remove reset token so it cannot be used again
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });

  } catch (error) {
    console.error("Reset password error:", error);

    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
};

const googleLogin = async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({
        success: false,
        message: "Google credential is required",
      });
    }

    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const {
      sub: googleId,
      email,
      name,
      email_verified,
    } = payload;

    if (!email_verified) {
      return res.status(401).json({
        success: false,
        message: "Google email is not verified",
      });
    }

    let user = await User.findOne({ googleId });

    if (!user) {
      user = await User.findOne({
        email: email.toLowerCase(),
      });
    }

    if (!user) {
      user = await User.create({
        name,
        email: email.toLowerCase(),
        googleId,
        authProvider: "google",
      });
    }

    const token = generateToken(user._id, user.role);

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error("Google login error:", error);

    res.status(401).json({
      success: false,
      message: "Google authentication failed",
    });
  }
};


const getMe = async (req,res)=>{
  res.status(200).json({
    success: true,
    user: req.user
  });
};


module.exports = {register,login, getMe, forgotPassword, resetPassword, googleLogin};