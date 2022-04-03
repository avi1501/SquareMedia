const mongoose = require("mongoose");

const CommentObj = {
    userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
    },
    postId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Post"
    },
    body:{
        type:String,
        require:true
    }
}


const CommentsSchema = mongoose.Schema(CommentObj, {timestamps:true});

module.exports = mongoose.model("Comment", CommentsSchema);