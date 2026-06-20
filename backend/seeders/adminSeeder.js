require("dotenv").config();

const mongoose = require("mongoose");
const bcrupt = require("bcryptjs");
const User = require("../models/User");
const connectDb = require("../config/db");

const createAdmin = async()=>{

  try{
    await connectDb();

    const existingAdmin = await User.findOne({
      email: "admin@examio.com"
    });

    if(existingAdmin){
      console.log("Admin already exists");
      process.exit();
    };

    const hashedPassword = await bcrupt.hash("Admin123",10);
    await User.create({
      name:"Examio Admin",
      email: "admin@examio.com",
      password: hashedPassword,
      role: "admin"
    });

    console.log("Admin created");
    process.exit();
  }catch(error){
    console.log(error);
    process.exit(1);
  }
};

createAdmin();