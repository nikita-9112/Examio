const fs = require("fs");
const cloudinary = require("../config/cloudinary");
const uploadPdf = async(req,res)=>{
  try{


    if(!req.file){
      console.log("no req.file");
      return res.status(400).json({
        success: false,
        message: "No file uploaded"
      });
    }
    const folder = req.body.folder || "question-papers";
    const result = await cloudinary.uploader.upload(
      req.file.path,
      {
        folder:`examio/${folder}`,
        resource_type:"raw"
      }
    );

    fs.unlinkSync(req.file.path);

    res.status(200).json({
      success: true,
      fileName: req.file.originalname,
      url: result.secure_url,
      publicId: result.public_id
    });

  }catch(error){

    if(req.file && fs.existsSync(
      req.file.path
    )){
      fs.unlinkSync(req.file.path);
    }

    console.log(error);
    
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  uploadPdf
};