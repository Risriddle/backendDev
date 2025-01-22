const User =require("../models/User")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config()

exports.register=async(req,res)=>{
    const {username,email,password}=req.body;

    try{
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ message: "Username already taken" });
        }
          const existingUser=await User.findOne({email:email});
          if(existingUser){
            console.log("User already exists")
            return res.status(400).json({message:"User with same email already exists"})
          }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

          const newUser=new User({
                  username:username,
                  email:email,
                  password:hashedPassword,
          })

          await newUser.save();
          res.status(200).json({message:"User registered successfully!"})


    }
    catch(error){
        if (error.code === 11000) {  
            if (error.keyPattern.username) {
                return res.status(400).json({ message: "Username already taken" });
            }
        }
        res.status(500).json({message:"Error registering user"})
    }
}




exports.login=async(req,res)=>{
    const {username,password}=req.body;

    try{
       
          const user=await User.findOne({username:username});
          if(!user){
            console.log("User does not exist")
            return res.status(400).json({message:"User does not exist. Register first!"})
          }
          
          
          const passwordValid=await bcrypt.compare(password,user.password)
          if(!passwordValid){
            return res.status(400).json({message:"Invalid password!"})
          }
      

        const accessToken=jwt.sign({userId:user._id,role:user.role},process.env.ACCESS_JWT_SECRET,  {expiresIn: "3h"})
        res.status(200).json({
            message: user.role === "admin" ? "Admin logged in successfully!" : "User logged in successfully!",
            token: accessToken
        });   

    }
    catch(error){
        res.status(500).json({message:"Error logging in user"})
    }
}


exports.regAdmin=async(req,res)=>{
    const {username,email,password}=req.body;
try{
    const existingAdmin = await User.findOne({ username });
    if (existingAdmin) {
        return res.status(400).json({ message: "Admin alreay exists!" });
    }
    
    
    if (password===process.env.ADMIN_SECRET)
    {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

     
            const admin=new User({
                username:username,
                email:email,
                password:hashedPassword,
                role:"admin"
            })

            await admin.save();
            res.status(200).json({message:"Admin registered"})

    }
}
catch(error){
    console.log("error while reg admin")
    res.status(500).json("error while creating admin")
}
}


