
const mongoose = require("mongoose");

const paperSchema = new mongoose.Schema({
  examYear:{
    type:Number,
    required:true,
  },
  examType:{
    type: String,
    required: true,
  },
  pdfUrl:{
    type: String,
    required: true,
  },
  uploadedAt:{
    type: Date,
    default: Date.now
  },
},
{_id: true}
);

const SubjectPackSchema = new mongoose.Schema({
  university:{
    type: String,
    required: true,
    trim: true
  },
  course: {
    type: String,
    required: true,
    trim: true,
  },
  branch:{
    type: String,
    required: true,
    trim: true
  },
  semester: {
    type: Number,
    requied: true
  },

  subjectCode: {
    type: String,
    requied: true,
    trim: true,
    uppercase:true,
  },
  subjectName: {
    type: String,
    required: true,
    trim: true,
  },

  slug:{
    type: String,
    required: true,
    unique: true,
  },
  description:{
    type: String,
    default: "",
  },
  price: {
    type: Number,
    required: true,
    default: 20,
  },
  thumbnailUrl:{
    type: String,
    default: "",
  },
  demoPdfUrl:{
    type: String,
    default: "",
  },
  isActive:{
    type: Boolean,
    default: true,
  },
  papers:[paperSchema],
  createdBy:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
    required: true
  }
},{
  timestamps: true
});


SubjectPackSchema.index(
  {
    university:1,
    course: 1,
    branch: 1,
    semester: 1,
    subjectCode:1
  },{
    unique: true
  }
);


module.exports = mongoose.model("SubjectPack",SubjectPackSchema);