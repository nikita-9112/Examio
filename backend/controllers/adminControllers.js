

const getDashboard = async (req,res)=>{

  res.status(200).json({
    success: true,
    message: "Welcome Admin Dashboard",

    admin:{
      id: req.user._id,
      name: req.user.name,
      email: req.user.email
    }
  });
}

module.exports = {getDashboard};