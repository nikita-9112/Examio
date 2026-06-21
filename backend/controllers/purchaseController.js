
const SubjectPack = require("../models/SubjectPack");
const Purchase = require("../models/PurchaseModel");


const createPurchase = async(req,res) =>{

  try{
    const {subjectPackId} = req.body;

    if(!subjectPackId){
      return res.status(400).json({
        success:false,
        message:"Subject Pack Id is required",
      });
    }

    // check subject pack
    const subjectPack = await SubjectPack.findById(subjectPackId);

    if(!subjectPack){
      return res.status(404).json({
        success: false,
        message: "Subject pack not found",
      });
    }

    // check Existing active purchase

    const activePurchase = await Purchase.findOne({
      user: req.user._id,
      subjectPack: subjectPackId,
      status:"completed",
      expiresAt:{
        $gt: new Date(), 
      },
    });

    if(activePurchase){

      return res.status(400).json({
        success: false,
        message: "Subject pack already purchased",
      });
    }

    // check Existing Pending puchase

    const pendingPurchase = await Purchase.findOne({
      user: req.user._id,
      subjectPack:subjectPackId,
      status:"pending",
    });

    if(pendingPurchase){
      return res.status(200).json({
        success:true,
        message: "Pending purchase already exists",
        purchase: pendingPurchase,
      });
    }

    // create new Pending purchase 

    const purchase = await Purchase.create({
      user: req.user._id,
      subjectPack: subjectPackId,
      amount: subjectPack.price,
      status:"pending",
    });


    return res.status(201).json({
      success: true,
      message:"Pending purchase created",
      purchase,
    });
  }catch(error){

    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error in creating purchase",
      error: error.message,
    });
  }
};

module.exports = {
  createPurchase,
}


