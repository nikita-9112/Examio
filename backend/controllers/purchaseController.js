
const SubjectPack = require("../models/SubjectPack");
const Purchase = require("../models/PurchaseModel");
const isValidObjectId = require("../utils/isValidObjectId");
const axios = require("axios");
const razorpay = require("../config/razorpay");
const crypto = require("crypto");

const createPurchase = async(req,res) =>{

  try{
    const {subjectPackId} = req.body;

    if(!subjectPackId){
      return res.status(400).json({
        success:false,
        message:"Subject Pack Id is required",
      });
    }

    if(!isValidObjectId(subjectPackId)){
      return res.status(400).json({
        success: false,
        message: "Invalid Subject pack Id",
      })
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

const markPurchaseCompleted =async(req,res)=>{
  try{

    const {purchaseId} = req.body;

    if(!purchaseId){
      return res.status(400).json({
        success: false,
        message: "Purchase Id is required",
      });
    }

    if(!isValidObjectId(purchaseId)){
      return res.status(400).json({
        success: false,
        message: "Invalid Subject pack Id",
      })
    }

    const purchase = await Purchase.findById(purchaseId);

    if(!purchase){
      return res.status(404).json({
        success: false,
        message: "Purchase not found"
      });
    }

    // Already completed
    if(purchase.status === "completed"){
      return res.status(400).json({
        success: false,
        message: "Purchase already completed",
      });
    }

    // only pending can become completed

    if(purchase.status !== "pending"){
      return res.status(400).json({
        success: false,
        message: "Only pending purchase can be completed",
      });
    }

    const expiryDate = new Date();
    expiryDate.setFullYear(expiryDate.getFullYear()+1);

    purchase.status = "completed";
    purchase.expiresAt = expiryDate;

    await purchase.save();
    return res.status(200).json({
      success: true,
      message: "Purchase completed successfully",
      purchase,
    });

  }catch(error){
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Error while completing purchase",
      error: error.message,
    });
  }
};

const markPurchaseFailed = async(req,res)=>{
  try{
    const {purchaseId} = req.body;

    if(!purchaseId){
      return res.status(400).json({
        success: false,
        message: "PUrchase Id is required",
      });

    }

    if(!isValidObjectId(purchaseId)){
      return res.status(400).json({
        success: false,
        message: "Invalid Subject pack Id",
      })
    }

    const purchase = await Purchase.findById(purchaseId);

    if(!purchase){
      return res.status(404).json({
        success: false,
        message: "Purchases not found",
      });
    }

    if(purchase.status === "failed"){
      return res.status(400).json({
        message: "Purchase already failed",
      });
    }

    if(purchase.status === "completed"){
      return res.status(400).json({
        success: false,
        message: "Completed purchse cannot be marked failed",
      });
    }

    purchase.status = "failed";
    await purchase.save();

    return res.status(200).json({
      success: true,
      message: "Purchase marked as failed",
      purchase,
    });

  }catch(error){

    console.log(error);
    return res.status(500).json({
      success: false,
      message:"Error while marking purchase failed",
      error: error.message,
    });
  }
};

const getMyPurchases = async(req,res)=>{
  try{
    const purchases = await Purchase.find({
      user: req.user._id,
      status:{
        $in:["pending","completed"],
      },
    })
    .populate("subjectPack")
    .sort({createdAt : -1});

    return res.status(200).json({
      success: true,
      count: purchases.length,
      purchases,
    });

  }catch(error){
    console.log(error);
    return res.status(500).json({
      success: false,
      message:"Error while fetching purchses",
      error: error.message,
    });
  }
};

const checkPurchaseAccess = async(req,res)=>{

  try{
    const {subjectPackId} = req.params;

    if(!isValidObjectId(subjectPackId)){
      return res.status(400).json({
        success: false,
        message: "Invalid Subject pack Id",
      })
    }

    const purchase = await Purchase.findOne({
      user : req.user._id,
      subjectPack: subjectPackId,
      status:"completed",
      expiresAt:{
        $gt: new Date(),
      },
    });

    return res.status(200).json({
      success: true,
      hasAccess: !!purchase,
    });

  }catch(error){
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Error while checking access",
      error: error.message,
    });
  }
};

const getFullPaper = async(req,res)=>{
  try{

    const {subjectPackId } = req.params;
    
    if(!isValidObjectId(subjectPackId)){
      return res.status(400).json({
        success: false,
        message: "Invalid Subject pack Id",
      })
    }

    const subjectPack = await SubjectPack.findById(subjectPackId);

    if(!subjectPack){
      return res.status(404).json({
        success: false,
        message: "Subject Pack not found",
      });
    }

    return res.status(200).json({
      success: true,
      papers: subjectPack.papers.map(
        (paper)=>({
          _id: paper._id,
          year: paper.examYear,
          examType: paper.examType,
          fileName:paper.fileName,
        })
      )
    });

  }catch(error){

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "error while fetching papwers",
      error: error.message,
    });
  }
};



const getProtectedPaper = async (req, res) => {
  try {
    const { subjectPackId, paperId } = req.params;

    // 1. Validate IDs
    if (
      !isValidObjectId(subjectPackId) ||
      !isValidObjectId(paperId)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid subject pack or paper ID",
      });
    }

    // 2. Find subject pack
    const subjectPack = await SubjectPack.findById(subjectPackId);

    if (!subjectPack) {
      return res.status(404).json({
        success: false,
        message: "Subject Pack not found",
      });
    }

    // 3. Find requested paper
    const paper = subjectPack.papers.id(paperId);

    if (!paper) {
      return res.status(404).json({
        success: false,
        message: "Paper not found",
      });
    }

    // 4. Fetch PDF from Cloudinary
    const response = await axios.get(paper.pdfUrl, {
      responseType: "stream",
    });

    // 5. Tell browser that this is a PDF
    res.setHeader("Content-Type", "application/pdf");

    // 6. Prevent browser from caching it
    res.setHeader(
      "Cache-Control",
      "private, no-store, no-cache, must-revalidate"
    );

    // 7. Stream Cloudinary response to browser
    response.data.pipe(res);

  } catch (error) {
    console.error("Error while opening protected paper:", error);

    if (!res.headersSent) {
      return res.status(500).json({
        success: false,
        message: "Unable to open paper",
      });
    }
  }
};

const createRazorpayOrder = async (req, res) => {
  try {
    const { subjectPackId } = req.body;

    // 1. Validate subject pack ID
    if (!subjectPackId) {
      return res.status(400).json({
        success: false,
        message: "Subject Pack ID is required",
      });
    }

    if (!isValidObjectId(subjectPackId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Subject Pack ID",
      });
    }

    // 2. Find subject pack
    const subjectPack = await SubjectPack.findById(subjectPackId);

    if (!subjectPack) {
      return res.status(404).json({
        success: false,
        message: "Subject Pack not found",
      });
    }

    // 3. Check whether user already has active access
    const activePurchase = await Purchase.findOne({
      user: req.user._id,
      subjectPack: subjectPackId,
      status: "completed",
      expiresAt: {
        $gt: new Date(),
      },
    });

    if (activePurchase) {
      return res.status(400).json({
        success: false,
        message: "You already own this subject pack",
      });
    }

    // 4. Create Razorpay order
    // Razorpay amount must be in paise
    const amountInPaise = Math.round(subjectPack.price * 100);

    const razorpayOrder = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: `examio_${Date.now()}`,
      notes: {
        userId: req.user._id.toString(),
        subjectPackId: subjectPack._id.toString(),
      },
    });

    // 5. Create purchase record
    const purchase = await Purchase.create({
      user: req.user._id,
      subjectPack: subjectPack._id,
      amount: subjectPack.price,
      paymentProvider: "razorpay",
      orderId: razorpayOrder.id,
      status: "pending",
    });

    // 6. Return safe order details to frontend
    return res.status(201).json({
      success: true,
      message: "Payment order created successfully",

      order: {
        id: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
      },

      purchaseId: purchase._id,
    });

  } catch (error) {
    console.error("Error while creating Razorpay order:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to create payment order",
      error: error.message,
    });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    // 1. Check required payment details
    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return res.status(400).json({
        success: false,
        message: "Payment verification details are required",
      });
    }

    // 2. Find our pending purchase using Razorpay order ID
    const purchase = await Purchase.findOne({
      orderId: razorpay_order_id,
      user: req.user._id,
      status: "pending",
    });

    if (!purchase) {
      return res.status(404).json({
        success: false,
        message: "Pending purchase not found",
      });
    }

    // 3. Generate expected signature
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(
        `${razorpay_order_id}|${razorpay_payment_id}`
      )
      .digest("hex");

    // 4. Compare Razorpay signature with our generated signature
    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment signature verification failed",
      });
    }

    // 5. Fetch payment details from Razorpay
    const payment = await razorpay.payments.fetch(
      razorpay_payment_id
    );

    // 6. Make sure payment belongs to the same Razorpay order
    if (payment.order_id !== razorpay_order_id) {
      return res.status(400).json({
        success: false,
        message: "Payment does not belong to this order",
      });
    }

    // 7. Check payment amount
    const expectedAmount = Math.round(
      purchase.amount * 100
    );

    if (payment.amount !== expectedAmount) {
      return res.status(400).json({
        success: false,
        message: "Payment amount does not match purchase amount",
      });
    }

    // 8. Payment must be captured
    if (payment.status !== "captured") {
      return res.status(400).json({
        success: false,
        message: `Payment is not captured. Current status: ${payment.status}`,
      });
    }

    // 9. Complete purchase
    const expiryDate = new Date();

    expiryDate.setFullYear(
      expiryDate.getFullYear() + 1
    );

    purchase.paymentId = razorpay_payment_id;
    purchase.status = "completed";
    purchase.expiresAt = expiryDate;

    await purchase.save();

    return res.status(200).json({
      success: true,
      message: "Payment verified and purchase completed",
      purchase,
    });

  } catch (error) {
    console.error(
      "Error while verifying payment:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to verify payment",
      error: error.message,
    });
  }
};

module.exports = {
  createPurchase,
  markPurchaseCompleted,
  markPurchaseFailed,
  getMyPurchases,
  checkPurchaseAccess,
  getFullPaper,
  getProtectedPaper,
  createRazorpayOrder,
  verifyPayment
};


