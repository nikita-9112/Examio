const SubjectPack = require("../models/SubjectPack");
const slugify = require("slugify");

const createSubjectPack = async(req,res)=>{
  try{

    const {
      university,
      course,
      branch,
      semester,
      subjectCode,
      subjectName,
      description,
      price
    } = req.body;

    if(!university || !course || !branch || !semester || !subjectCode || !subjectName  ){
      return res.status(400).json({
        success: false,
        message: "All requied fields are mandatory"
      });
    }
    const existingPack = await SubjectPack.findOne({
      university,
      course,
      branch,
      semester,
      subjectCode: subjectCode.toUpperCase()
    });

    if(existingPack){
      return res.status(400).json({
        success: false,
        message: "Subject pack already exists"
      });
    }

    const slug = slugify(`${subjectCode}-${subjectName}`,
    {
      lower:true,
      strict: true 
    });

    const subjectPack = await SubjectPack.create({
      university,
      course,
      branch,
      semester,
      subjectCode: subjectCode.toUpperCase(),
      subjectName,
      description,
      price,
      slug,
      createdBy: req.user._id 
    });

    res.status(201).json({
      success: true,
      data: SubjectPack
    });
  }catch(error){
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


module.exports = {
  createSubjectPack
}