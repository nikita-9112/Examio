const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref: "User",
    required:true,
    index: true,
  },
  subjectPack:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"SubjectPack",
    required: true,
    index: true,
  },
  amount:{
    type: Number,
    required: true,
  },

  paymentProvider:{
    type: String,
    default: "razopay",
  },
  orderId:{
    type: String,
    default:null,
  },
  paymentId:{
    type: String,
    default: null
  },
  status:{
    type: String,
    enum:["pending","completed","failed","refounded"],
    default: "pending",
  },

  purchasedAt:{
    type: Date,
    default: Date.now
  },
  expiresAt:{
    type: Date,
    default: null
  }

},{
  timestamps: true,
});

purchaseSchema.index({
  user:1,
  subjectPack:1,
});


module.exports = mongoose.model("Purchase",purchaseSchema);