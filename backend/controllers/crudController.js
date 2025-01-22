const Product=require("../models/Product")
const mongoose=require('mongoose')

exports.create=async(req,res)=>{
    const {name,description,price,category}=req.body;
    
    try{
    const newProduct=new Product(
       { name:name,
        description:description,
        price:price,
        category:category,
       }
    )
    const result=await newProduct.save();
    res.status(200).json({data:result,message:"New product created successfully"})
}
catch(error)
{
    console.log("error while creating product");
    res.status(500).json("error while creating product: ",error)
}
}



exports.getAll=async(req,res)=>{
   
    try{
    
    const result=await Product.find();
    res.status(200).json({data:result,message:"All products fetched successfully"})
}
catch(error)
{
    console.log("error while fetching all products");
    res.status(500).json("error while fetching all products: ",error)
}
}




exports.getById=async(req,res)=>{
   const productId=req.params.id

   if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ error: "Invalid product ID" });
}

    try{
    
    const result=await Product.findById(productId);
    if (!result){
        return res.status(404).json({message:"Product not found!"})
    }
    res.status(200).json({data:result,message:"product fetched successfully"})
}
catch(error)
{
    console.log("error while fetching product");
    res.status(500).json("error while fetching product: ",error)
}
}




exports.updateById=async(req,res)=>{
    const productId=req.params.id
    const updatedProduct=req.body;
 
    if (!mongoose.Types.ObjectId.isValid(productId)) {
     return res.status(400).json({ error: "Invalid product ID" });
 }
 
     try{
     
     const result=await Product.findByIdAndUpdate(productId,updatedProduct,{new:true});
     
     if (!result){
         return res.status(404).json({message:"Product not found!"})
     }
     res.status(200).json({data:result,message:"product updated successfully"})
 }
 catch(error)
 {
     console.log("error while updating product");
     res.status(500).json("error while updating product: ",error)
 }
 }


 

exports.deleteById=async(req,res)=>{
    const productId=req.params.id
  
    if (!mongoose.Types.ObjectId.isValid(productId)) {
     return res.status(400).json({ error: "Invalid product ID" });
 }
 
     try{
     
     const result=await Product.findByIdAndDelete(productId);
     
     if (!result){
         return res.status(404).json({message:"Product not found!"})
     }
     res.status(200).json({data:result,message:"product deleted successfully"})
 }
 catch(error)
 {
     console.log("error while deleting product");
     res.status(500).json("error while deleting product: ",error)
 }
 }


