const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username:{
    type:String,
    unique:true},
  email: {
    type:String,
    unique:true},
  password: String,
  messages:[{
    from:String,
    message:String
  }],
  requests: [{
    user:String,
    group:String
  }],
  followReq: [
    String
  ],
  followers: [
    String,
  ],
  following: [
    String,
  ],
  groups: [
    String,
  ],
  wishList: [{
    username:String,
    productName:String,
    description:String,
    imageLink:String,
    purchaseLink:String
  }]
})
module.exports = mongoose.model("User", userSchema);