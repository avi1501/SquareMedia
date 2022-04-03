const Router = require("express").Router();
const Comment = require("../models/Comment");
const Post = require("../models/Post");
const User = require("../models/User");

//create comment
Router.post("/", async (req, res)=>{
    try{
        const user = await User.findById(req.body.userId);
        const commentBody = {
            userId:user._id,
            username:user.username,
            postId:req.body.postId,
            body:req.body.body,
        }

        const newComment = new Comment(commentBody);
    
        const saveComment = await newComment.save();
        var {userId, postId, ...commentDetail} = saveComment._doc;
        res.status(200).json(commentDetail);
    }catch(err){
        res.status(500).send(err);
    }
    
});


//Update Comment
Router.put("/:id", async (req, res)=>{
    try{
        const comment = await Comment.findById(req.params.id);
        
        if(req.body.userId != comment.userId){
            res.status(401).json("you can only update your comment");
        }

        try{
            const updatedComment = await Comment.findByIdAndUpdate(comment._id, {body:req.body.body}, {new:true});
            var {userId, postId, ...commentDetail} = updatedComment._doc;
            
            res.status(200).send(commentDetail);
        }catch(err){
            res.status(500).send(err);
        }

    }catch(err){
        res.status(404).send(err);
    }
});


//Delete Comment
Router.delete("/:id", async (req, res)=>{
    try{
        const comment = await Comment.findById(req.params.id);
        if(req.body.userId != comment.userId){
            res.status(401).send("You can only delete your comment");
        }
        try{
            await comment.delete();
            res.status(200).send("comment delete successfully")
        }catch(err){
            res.status(500).send(err);
        }
        
    }catch(err){
        res.status(404).send(err);
    }
})


//All Comments on post
Router.get("/postComment/:id", async(req, res)=>{
    try{
     
        const post = await Post.findById(req.params.id)
 
        const comments = await Comment.find({postId:post._id});
       
        const allCommentDetails = {
            postId:post.id,
            comments:[]
        }
        console.log(comments.length)
        for(var i=0;i<comments.length;i++){
            const user = await User.findById(comments[i].userId+"")
            console.log(user)
            console.log(comments[i])
            var comment = {
                id:comments[i]._id,
                body:comments[i].body,
                user:{
                    username:user.username,
                    name:user.name
                }
            }
            console.log("adfa")
            allCommentDetails.comments = [...allCommentDetails.comments, comment]
        }

        res.status(200).send(allCommentDetails);
    }catch(err){
        res.status(500).send(err);
    }

})


module.exports = Router;