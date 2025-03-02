const mongoose=require("mongoose");

const userSchema=new mongoose.Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true
        },
        email:{
            type:String,
            unique:true,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        role: { type: String, enum: ["user", "admin"], default: "user" }

    },{timestamps:true}
)


const User=mongoose.model('user',userSchema)
module.exports=User;