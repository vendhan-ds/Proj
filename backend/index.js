const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRouter=require("./routes/user-routes")
const groupRouter=require("./routes/group-routes");
const router = require("./routes/user-routes");

//import Group from "./models/groupSchema"
const User = require('./models/userSchema')
const app = express();
mongoose.set('strictQuery', false);
//app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(
    cors({
      origin:"*",
})
);
//const User=mongoose.model(userSchema)
app.use("/user",userRouter);
app.use("/group",groupRouter);
app.get("/test",async(req,res)=>{
    console.log("YEEEP")
})
app.post("/register1",async(req,res)=>{   
    console.log("entered register api")
    console.log(req.body);
    const data=req.body;
    let newuser
   try{
        newuser=new User({
            username:data.username,
            email:data.email,
            password:data.password
        })
        await newuser.save();
        console.log("saved");
        res.send("1")
    }
   catch(e){
        console.log(e.message)
        //return 0
        res.send("0")
   }
})
app.post("/login",async(req,res)=>{
   try{
        console.log("entered login api")   
        const data=req.body;
        console.log(data)
        var pass=await User.findOne({username : data.username });
        console.log(pass);
        if(data.password==pass.password){
            console.log("true")
            res.send('1') ;
        }else{
            res.send('0') ;/* res.status(404).json({message: "credentials error"}); */
        }

    }
   catch(e){
        console.log(e.message)
        res.send("failure")
   }
})

mongoose.connect("mongodb://127.0.0.1:27017/winterproj",{
    useNewUrlParser:true , useUnifiedTopology:true
},(err)=>{
    if(err){console.log(err)}
    else{
        console.log("connected to database successfully");
    }
})
app.listen(4000,()=>{
    console.log("listening to port 4000")
})

