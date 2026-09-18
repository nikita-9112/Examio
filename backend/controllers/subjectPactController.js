const SubjectPack = require("../models/SubjectPack");
const slugify = require("slugify");
const cloudinary = require("../config/cloudinary");
const { isValidObjectId } = require("mongoose");

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
      price,
      isActive,
      demoPdfUrl,
      demoPdfPublicId,
    } = req.body;

    if( !university || !course || !branch || !semester || !subjectCode || !subjectName ){
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
      isActive,
      demoPdfUrl:demoPdfUrl || "",
      demoPdfPublicId: demoPdfPublicId || "",
      createdBy: req.user._id 
    });

    res.status(201).json({
      success: true,
      message:"SubjectPack Created Successfully",
      data: subjectPack
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

    const sanitizedPacks = packs.map(pack =>({
      _id : pack.id,
      university:pack.university,
      course: pack.course,
      branch: pack.branch,
      semester: pack.semester,
      subjectName:pack.subjectName,
      subjectCode: pack.subjectCode,
      price:pack.price,
      demoPdfUrl: pack.demoPdfUrl,

      papers: pack.papers.map(paper =>({
        _id: paper._id,
        examYear: paper.examYear,
        examType: paper.examType,
        fileName: paper.fileName,
        uploadedAt: paper.uploadedAt,
      }))
    }));

    res.status(200).json({
      success: true,
      count: sanitizedPacks.length,
      data: sanitizedPacks
    });
  }catch(error){
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getSingleSubjectPack = async(req,res) =>{

  try{

    const subjectPackId = req.params.id;

    if(!isValidObjectId(subjectPackId)){
      return res.status(400).json({
        success: false,
        message: "Invalid Subject Pack Id",
      })
    };
    const pack = await SubjectPack.findById(subjectPackId);

    if(!pack || pack.isActive === false){
      return res.status(404).json({
        success: false,
        message: "Subject pack not found"
      });
    }

    const sanitizedPack = {
      _id : pack.id,
      university:pack.university,
      course: pack.course,
      branch: pack.branch,
      semester: pack.semester,
      subjectName:pack.subjectName,
      subjectCode: pack.subjectCode,
      price:pack.price,
      demoPdfUrl: pack.demoPdfUrl,

      papers: pack.papers.map(paper =>({
        _id: paper._id,
        examYear: paper.examYear,
        examType: paper.examType,
        fileName: paper.fileName,
        uploadedAt: paper.uploadedAt,
      }))
    }

    res.status(200).json({
      success: true,
      data: sanitizedPack,
    });
  }catch(error){

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
const getAllSubjectPacksforAdmin = async(req,res) =>{
  try{

    const packs = await SubjectPack.find({}).sort({createdAt: -1});

  if(!packs){
    return res.staus(404).json({
      message:"NO Subject pack added at."
    });
  }

    res.status(200).json({
      success: true,
      count: packs.length,
      data: packs
    });
  }catch(error){
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


const getSingleSubjectPackForAdmin = async(req,res) =>{

  try{

    const subjectPackId = req.params.id;

    if(!isValidObjectId(subjectPackId)){
      return res.status(400).json({
        success: false,
        message: "Invalid Subject Pack Id",
      })
    };
    const pack = await SubjectPack.findById(subjectPackId);

    if(!pack ){
      return res.status(404).json({
        success: false,
        message: "Subject pack not found"
      });
    }



    res.status(200).json({
      success: true,
      data: pack,
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
    if(!isValidObjectId(req.params.id)){
      return res.status(400).json({
        success: false,
        message: "Invalid Subject pack Id",
      })
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
    if(!isValidObjectId(packId)){
      return res.status(400).json({
        success: false,
        message: "Invalid Subject pack Id",
      })
    }
    if(!isValidObjectId(paperId)){
      return res.status(400).json({
        success: false,
        message: "Invalid Subject pack Id",
      })
    }

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

    if(!isValidObjectId(req.params.id)){
      return res.status(400).json({
        success: false,
        message: "Invalid Subject pack Id",
      })
    }

    const pack = await SubjectPack.findById(req.params.id);

    if(!pack){
      return res.status(404).json({
        success: false,
        message: "Subject pack not found"
      });
    }

    const {
      university,
      course,
      branch,
      semester,
      subjectCode,
      subjectName,
      price,
      description,
      thumbnailUrl,
      demoPdfUrl,
      demoPdfPublicId,
      isActive,
    } = req.body;
    
    
    // Academic information
    
    if (university !== undefined) {
      pack.university = university;
    }
    
    if (course !== undefined) {
      pack.course = course;
    }
    
    if (branch !== undefined) {
      pack.branch = branch;
    }
    
    if (semester !== undefined) {
      pack.semester = semester;
    }
    
    
    // Subject information
    
    if (subjectCode !== undefined) {
      pack.subjectCode = subjectCode;
    }
    
    if (subjectName !== undefined) {
      pack.subjectName = subjectName;
    }
    
    
    // Pack details
    
    if (price !== undefined) {
      pack.price = price;
    }
    
    if (description !== undefined) {
      pack.description = description;
    }
    
    if (isActive !== undefined) {
      pack.isActive = isActive;
    }
    
    
    // Optional media fields
    
    if (thumbnailUrl !== undefined) {
      pack.thumbnailUrl = thumbnailUrl;
    }
    
    if (demoPdfUrl !== undefined) {
      pack.demoPdfUrl = demoPdfUrl;
    }
    
    if (demoPdfPublicId !== undefined) {
      pack.demoPdfPublicId = demoPdfPublicId;
    }
    
    
    await pack.save();
    
    res.status(200).json({
      success: true,
      message: "Subject pack updated successfully",
      data: pack,
    });

  }catch(error){
    res.status(200).json({
      success: false,
      message: error.message
    });
  }
};

const deleteSubjectPack = async(req,res)=>{

  try{
    const {id} = req.params;

    if(!isValidObjectId(id)){
      return res.status(400).json({
        success: false,
        message: "Invalid Subject pack Id",
      })
    }

    const pack = await SubjectPack.findById(id);

    if(!pack){
      return res.status(404).json({
        success: false,
        message: "Subject pack not found"
      });
    }

    const deletePaperPromises = 
    pack.papers
    .filter(paper => paper.publicId)
    .map(paper =>
      cloudinary
      .uploader.destroy(
        paper.publicId,
        {
          resource_type: "raw"
        }
      ));

    await Promise.all(deletePaperPromises);

    if(pack.demoPdfPublicId){

      await cloudinary
      .uploader
      .destroy(
        pack.demoPdfPublicId,
        {
          resource_type: "raw"
        }
      );
    }

    await pack.deleteOne();

    res.status(200).json({
      success: true,
      message: "Subject pack deleted successfully"
    });

  }catch(error){
    res.status(500).json({
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
  updateSubjectPack,
  deleteSubjectPack,
  getAllSubjectPacksforAdmin,
  getSingleSubjectPackForAdmin
};