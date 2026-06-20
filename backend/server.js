require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDb = require("./config/db");


connectDb();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
  res.send("Examio API Running");
});


const PORT = process.env.PORT || 5000
app.use("/api/auth",require("./routes/authRoutes"));


app.listen(PORT,()=>{
  console.log(`server is running on port ${PORT}`);
})