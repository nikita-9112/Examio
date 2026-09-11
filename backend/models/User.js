const mongoose = require("mongoose");


const purchaseSchema = new mongoose.Schema({
  subjectPackId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"SubjectPack"
  },
  purchasedAt:{
    type:Date
  },
  expiresAt:{
    type:Date
  },
});

const userSchema = new mongoose.Schema(
  {
    name:{
      type:String,
      require:true,
      trim:true
    },
    
    email:{
      type:String,
      require:true,
      unique:true,
      lowercase:true
    },
    password: {
      type: String,
      required: function () {
        return this.authProvider === "local";
      },
    },
    
    authProvider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },

    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
    
    resetPasswordToken: {
      type: String,
    },
    
    resetPasswordExpire: {
      type: Date,
    },

    role:{
      type: String,
      enum:["student","admin"],
      default:"student",
    },
    purchases: [purchaseSchema]
  },
  {timestamps: true}
);

module.exports = mongoose.model("User",userSchema);