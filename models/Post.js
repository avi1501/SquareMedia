const mongoose = require("mongoose");

const postObj = {
       userId:{
              type: mongoose.Schema.Types.ObjectId,
              ref:"User",
              
       },
       body:{
           type:String,
           require:false,
       },
       
}


const PostSchema = new mongoose.Schema(postObj, {timestamps:true});

module.exports = mongoose.model("Post", PostSchema);

