

// its verify that if user is exist then he is a student or admin
const adminOnly = (req,res,next)=>{
  if(!req.user){
    console.log("user not present");
    return res.status(401).json({
      success: false,
      message: "Unauthorized"
    });
  }

  if(req.user.role !== "admin"){
    console.log("uses is not admin");
    return res.status(403).json({
      success: false,
      message: "Admin access required"
    });
  }

  next();
};

module.exports = adminOnly;