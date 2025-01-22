const express=require('express')
const app=express()
require('dotenv').config();
const authRouter=require("./routes/authRoutes")
const apiRouter=require("./routes/apiRoutes")
const mongoose=require('mongoose');
const port=process.env.PORT;


mongoose.connect(process.env.MONGODB_URI,{})
.then(()=>{console.log("db connected")})
.catch((error)=>{console.log("error while connecting to db: ",error)})


app.use(express.json());
app.use("/auth",authRouter);
app.use("/api",apiRouter);

app.listen(port,()=>{console.log(`Server listening on http://localhost:${port}`)});