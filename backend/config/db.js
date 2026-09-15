
const mongoose = require("mongoose");

const connectDb= async() =>{
  try{
    
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected!!");
  }catch(error){
    console.error("MongoDB connection failed:");
    console.log(error);
    process.exit(1);
  }
}

module.exports = connectDb;