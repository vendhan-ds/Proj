const User =require("../models/userSchema")
//const User =require("../models/messageSchema")

const getAllusers=async(req,res)=>{
    let mesgs;
    try{
        console.log("entered search backend")
        mesgs=await User.find().clone();
        console.log(mesgs)
        var pushdata=[];
        mesgs.forEach(element => {
            pushdata.push(element.username)
        });
        res.send(pushdata);
    }catch(err){
        console.log(err);
    }
}



const getMessages=async(req,res)=>{
    console.log("entered get message")
    let msgs;
    try{
        msgs=await User.findOne({username:req.params.user}).clone();
        if(msgs!=null){console.log(msgs.messages)
        res.send(msgs.messages)}
    }catch(err){
        console.log(err);
    }
}

const getGroups=async(req,res)=>{
    console.log("entered get group")
    let msgs;
    try{
        msgs=await User.findOne({username:req.params.user}).clone();
        if(msgs!=null){console.log(msgs.groups)
        res.send(msgs.groups)}
    }catch(err){
        console.log(err);
    }
}

const addMessage=async(req,res)=>{
    console.log("entered add message")
    let newMsg;
    try {
        await User.findOneAndUpdate({username:req.body.user},{$push:{messages:req.body.message }}).then(
            function(error,success){
            if (error) {
            console.log(error);
        } else {
            console.log(success);
        }
        }
        )
        
         
        //newMsg=new 
    } catch (error) {
        console.log(error)
    }
}

const newInvite=async(req,res)=>{
    console.log("entered new invite")
    let info=req.body;
    console.log(info)
    if(info.inviteFrom==info.inviteTo){
        res.send("cant invite yourself")
    }
    try {

        var a= await User.findOne({username:info.inviteFrom}).clone();
        console.log(a)
        if(a.following.indexOf(info.inviteTo)==-1){
            console.log("checked if already following")
            await User.findOneAndUpdate({username:info.inviteTo},{$push:{followers:info.inviteFrom }}).then(
                async function(error,success){
                    if (error) {
                        console.log(error);
                    } else {
                        console.log(success);
                        await User.findOneAndUpdate({username:info.inviteFrom},{$push:{following:info.inviteTo }}).then(
                            function(error,success){
                                if (error) {
                                    console.log(error);
                                } else {
                                    console.log(success);
            
                                }
                            }
                         )
                        }            
                }
            )
        }
        

        
        //newMsg=new 
    } catch (error) {
        console.log(error)
    }
}

exports.getAllusers=getAllusers;
exports.newInvite=newInvite;
exports.getMessages=getMessages;
exports.getGroups=getGroups;
exports.addMessage=addMessage;