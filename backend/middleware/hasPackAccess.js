const Purchase = require("../models/PurchaseModel");

const hasPackAccess = async(req,res,next)=>{

  try{

    const {subjectPackId} = req.params;
    const purchase = await Purchase.findOne({
      user: req.user._id,
      subjectPack: subjectPackId,
      status:"completed",
      expiresAt:{
        $gt: new Date(), 
      },
    });

    if(!purchase){
      return res.status(403).json({
        success: false,
        message: "You do not have access to this subject pack",
      });
    }

    next();

  }catch(error){
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while checking pack access",
      error: error.message,
    });
  }
};

module.exports = hasPackAccess;