require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDb = require("./config/db");


connectDb();

const app = express();

app.use(cors({
  origin:"http://localhost:5173",
  credentials:true,
}));
app.use(express.json());

app.get("/",(req,res)=>{
  res.send("Examio API Running");
});


const PORT = process.env.PORT || 5000

app.use("/public", express.static(path.join(__dirname, "public")));

app.use("/api/auth",require("./routes/authRoutes"));
app.use("/api/admin",require("./routes/adminRoutes"));
app.use("/api/subject-packs", require("./routes/subjectPackRoutes"));
app.use("/api/upload",require("./routes/uploadRoutes"));
app.use("/api/v1/purchase",require("./routes/purchaseRoutes"));

app.listen(PORT,()=>{
  console.log(`server is running on port ${PORT}`);
})