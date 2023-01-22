const Group =require("../models/groupSchema")
const User =require("../models/userSchema")

const newGroup=async(req,res)=>{
    console.log("entered newGroup api")
    console.log(req.body);
    const data=req.body;
    let newgrp
    try{
        newgrp=new Group({
            name:data.name,
            regisDate:data.email,
            budget:data.budget,
            location:data.location,
            admin:data.admin,
            members:[{username:data.admin}]
        })
        await newgrp.save();
        console.log("saved");
        await User.findOneAndUpdate({username:req.body.admin},{$push:{groups:req.body.name }}).then(
            function(error,success){
            if (error) {
            console.log(error);
        } else {
            console.log(success);
        }
        }
        )
        res.send("1")
    }
    catch(e){
        console.log(e.message)
        //return 0
        res.send("0")
   }
}

const getHisGroups=async(req,res)=>{
    
}

const getAllgroups=async(req,res)=>{
    let grps;
    let usrGrps;
    var user=req.params.user
    try{
        console.log("entered grp search backend")
        grps=await Group.find().clone();
        usrGrps=await User.findOne({username:user}).clone();
        console.log(usrGrps)
        usrGrps=usrGrps.groups
        console.log(grps)
        var pushdata=[];
        
        grps.forEach(element => {
            let k=0;
            usrGrps.forEach((el)=>{
                if(element.name==el){
                    k=1;
                }
            })
            if(k==0){
                pushdata.push(element.name)
            }
            
        });
        res.send({searchdata:pushdata, userGrps:usrGrps});
    }catch(err){
        console.log(err);
    }
}

exports.getAllgroups=getAllgroups;
exports.getHisGroups=getHisGroups;
exports.newGroup=newGroup;