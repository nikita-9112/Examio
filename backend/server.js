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
app.use("/api/admin",require("./routes/adminRoutes"));
app.use("/api/subject-packs", require("./routes/subjectPackRoutes"));
app.use("/api/upload",require("./routes/uploadRoutes"));
app.use("/api/purchase",require("./routes/purchaseRoutes"));

app.listen(PORT,()=>{
  console.log(`server is running on port ${PORT}`);
})