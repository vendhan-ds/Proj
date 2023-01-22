const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  name:String,
  regisDate:Date,
  budget:String,
  location:String,
  shuffleDone:Number,
  admin:String,
  members:[{
    username:String
  }],
  messages:[{
    from:String,
    message:String
  }
  ]


})

module.exports = mongoose.model("group", groupSchema);