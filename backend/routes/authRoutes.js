const express=require("express")
const authController=require("../controllers/authController")
const validateUser = require("../middlewares/validateUser");
const Router=express.Router()

Router.post("/register",validateUser,authController.register)
Router.post("/login",validateUser,authController.login)
Router.post("/regAdmin",validateUser,authController.regAdmin)

module.exports=Router