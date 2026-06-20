const jwt = require("jsonwebtoken");
const User = require("../models/User");

// its verify is there is any user or not.
const protect = async (req,res,next) =>{

  try{
    let token;

    if(
      req.headers.authorization && req.headers.authorization.startsWith(
        "Bearer"
      )
    ){
      token = req.headers.authorization.split(" ")[1];
    
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );
        
      req.user = await User.findById(decoded.id).select("-password");
      next();
    }else{
     console.log("no access");
      return res.status(401).json({
        success: false,
        message: "Not authorized"
      });
    }
  }catch(error){
    return res.status(401).json({
      success: false,
      message: "Invalid token"
    });
  }
};

module.exports = protect;