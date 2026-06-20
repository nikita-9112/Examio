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

const getAllSubjectPacks = async(req,res) =>{
  try{
    const packs = await SubjectPack.find({isActive: true}).sort({createdAt: -1});

    res.status(200).json({
      success: true,
      count: packs.length,
      data: packs
    });
  }catch(error){
    rs.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getSingleSubjectPack = async(req,res) =>{

  try{
    const pack = await SubjectPack.findById(req.params.id);

    if(!pack){
      return res.status(404).json({
        success: false,
        message: "Subject pack not found"
      });
    }

    res.status(200).json({
      success: true,
      data: pack
    });
  }catch(error){

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

module.exports = {
  createSubjectPack,
  getAllSubjectPacks,
  getSingleSubjectPack
};