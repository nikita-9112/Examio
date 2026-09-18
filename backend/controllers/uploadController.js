const fs = require("fs");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

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

    const result = await new Promise((resolve, reject) =>{

      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder:`examio/${folder}`,
          resource_type:"raw"
        },
        (error, result ) =>{

          if(error) {
            reject(error);
          }else{
            resolve(result);
          }
        }
      );

      streamifier
      .createReadStream(req.file.buffer)
      .pipe(uploadStream);

    });
 

    res.status(200).json({
      success: true,
      fileName: req.file.originalname,
      url: result.secure_url,
      publicId: result.public_id
    });

  }catch(error){

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