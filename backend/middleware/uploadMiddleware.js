
const multer = require("multer");

const storage = multer.memoryStorage();


const fileFilter = (req,file, cb) =>{

  if(file.mimetype === "application/pdf"){
    cb(null, true);
  }else{

    cb(new Error("Only PDF files are allowed"));
  }
};

const upload = multer({
  storage,
  fileFilter, 
  limits:{
    fileSize: 25 * 1024 * 1024
  }
});

module.exports = upload;