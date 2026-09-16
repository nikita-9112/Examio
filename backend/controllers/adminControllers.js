const SubjectPack = require("../models/SubjectPack");
const Purchase = require('../models/PurchaseModel');

const getDashboard = async (req,res)=>{

  res.status(200).json({
    success: true,
    message: "Welcome Admin to Dashboard",

    admin:{
      id: req.user._id,
      name: req.user.name,
      email: req.user.email
    }
  });
}

const getDashboardStats = async(req,res) =>{

  try{

   const totalSubjectPacks = await SubjectPack.countDocuments();
  

  const paperResult = await SubjectPack.aggregate([ 
    {
       $unwind: "$papers" 
    },
    { 
      $count: "totalPapers" 
    }
   ]);

   console.log(paperResult);

   const totalPapers = paperResult.length >0 ? paperResult[0].totalPapers : 0;

  //  get total purchases
  const totalPurchases = await Purchase.countDocuments();


  res.status(200).json({
    success: true,
    data:{
      totalSubjectPacks,
      totalPapers,
      totalPurchases
    }
  });

  }catch(err){

    console.error("Error feching dashboard statistics:", err);

    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard statistics."
    });
  }
};

module.exports = {
  getDashboard, 
  getDashboardStats
};