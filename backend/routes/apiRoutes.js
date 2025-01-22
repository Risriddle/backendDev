const express=require("express")
const verifyUserAuth = require("../middlewares/verifyUserAuth")
const crudController=require("../controllers/crudController")
const grantAdminAccess=require("../middlewares/accessMiddleware")
const validateProduct = require("../middlewares/validateProduct");
const Router=express.Router()

Router.get("/all",verifyUserAuth,crudController.getAll)
Router.get("/byId/:id",verifyUserAuth,crudController.getById)
Router.post("/create",validateProduct,grantAdminAccess,crudController.create)
Router.put("/update/:id",validateProduct,grantAdminAccess,crudController.updateById)
Router.delete("/delete/:id",grantAdminAccess,crudController.deleteById)



module.exports=Router