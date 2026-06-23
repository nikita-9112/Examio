const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");


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


const getMe = async (req,res)=>{
  res.status(200).json({
    success: true,
    user: req.user
  });
};


module.exports = {register,login, getMe};