const SubjectPack = require("../models/SubjectPack");
const slugify = require("slugify");
const cloudinary = require("../config/cloudinary");

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
};

const addPaperToPack = async(req,res)=>{
  try{

    const {
      examYear,
      examType,
      fileName,
      pdfUrl,
      publicId
    } = req.body;

    if(!examYear || !examType || !pdfUrl || !fileName || !publicId) {
      return res.status(400).json({
        success: false,
        message: "all fields are required"
      });
    }

    const currentYear = new Date().getFullYear();
    if(examYear <2000 || examYear > currentYear+1){
      return res.status(400).json({
        success: false,
        message: "Invalid exam year"
      });
    }
    const pack = await SubjectPack.findById(req.params.id);

    if(!pack){
      return res.status(404).json({
        success: false,
        message: "Subject pack not found"
      });
    }
  
    const existingPaper = pack.papers.find(
      paper =>
      paper.examYear === Number(examYear) && 
      paper.examType.toLowerCase() === examType.toLowerCase()
    );

    if(existingPaper){
      return res.status(400).json({
        success: false,
        message: "Paper already exists for this exam year and exam type"
      });
    }
    pack.papers.push({
      examYear,
      examType: examType.trim(),
      fileName,
      pdfUrl,
      publicId
    });

    await pack.save();

    pack.papers.sort((a,b) =>{
      if(b.examYear !== a.examYear){
        return (b.examYear- a.examYear);
      }
      return b.uploadedAt- a.uploadedAt;
    });
    res.status(200).json({
      success: true,
      message: "Paper added successfully",
      data: pack
    });
  }catch(error){
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const deletePaperFromPack = async(req,res)=>{
  try{

    const {packId, paperId} = req.params;

    const pack = await SubjectPack.findById(packId);

    if(!pack){
      return res.status(404).json({
        success: false,
        message: "Subject pack not found"
      });
    }

    const paper = pack.papers.id(paperId);

    if(!paper){
      return res.status(404).json({
        success: false,
        message: "Paper not found"
      });
    }

    if( !paper.publicId){
     res.status(404).json({
      success:false,
      message: "publicId for this pdf not exist"
     })
    }
    await cloudinary.uploader.destroy(
      paper.publicId,
      {
        resource_type:"raw"
      }
    );

    paper.deleteOne();

    await pack.save();

    res.status(200).json({
      success: true,
      message: "Paper deleted successfully",
    })
  }catch(error){
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const updateSubjectPack = async(req,res)=>{
  try{
    const pack = await SubjectPack.findById(req.params.id);

    if(!pack){
      return res.status(404).json({
        success: false,
        message: "Subject pack not found"
      });
    }

    const {price,
       description,
       thumbnailUrl,
       demoPdfUrl,
       demoPdfPublicId,
       isActive
    } = req.body;

    if(price !== undefined){
      pack.price = price;
    }

    if(description !== undefined){
      pack.description = description
    }
    if(thumbnailUrl !== undefined){
      pack.thumbnailUrl = thumbnailUrl
    }

    if(demoPdfUrl !== undefined){
      pack.demoPdfUrl = demoPdfUrl
    }

    if(isActive !== undefined){
      pack.isActive = isActive
    }

    if(demoPdfPublicId !== undefined){
      pack.demoPdfPublicId = demoPdfPublicId;
    }
    
    await pack.save();

    res.status(200).json({
      success: true,
      message: "Subject pack updated successfully",
      data: pack
    });

  }catch(error){
    res.status(200).json({
      success: false,
      message: error.message
    });
  }
};


module.exports = {
  createSubjectPack,
  getAllSubjectPacks,
  getSingleSubjectPack,
  addPaperToPack,
  deletePaperFromPack,
  updateSubjectPack
};