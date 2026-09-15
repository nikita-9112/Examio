require("dotenv").config();

const dns = require("dns");

dns.setServers([
  "8.8.8.8",
  "1.1.1.1"
]);


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
      console.log(existingAdmin.email);
      process.exit(0);
    };

    const hashedPassword = await bcrupt.hash("Admin123",10);
    await User.create({
      name:"Examio Admin",
      email: "admin@examio.com",
      password: hashedPassword,
      role: "admin"
    });

    console.log("Admin created");
    process.exit(0);
  }catch(error){
    console.log(error);
    process.exit(1);
  }
};

createAdmin();