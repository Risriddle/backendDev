const jwt = require("jsonwebtoken");
require("dotenv").config()

const grantAdminAccess=(req,res,next)=>{
    const token =req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(401).json({message:"No token found!"})
    }
    let decoded;
    try {
        
        decoded = jwt.verify(token, process.env.ACCESS_JWT_SECRET);
        if(decoded.role!=="admin"){
            console.log("Authenticated as USER");
            return res.status(403).json({message:"Access frobidden to user!"})
        } 
        req.user=decoded;
        next();
      
    } catch (error) {
            return res.status(403).json({ message: "Invalid or expired token" });
        }
    }
    module.exports = grantAdminAccess;






