const Router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

//Create Post
Router.post("/", async (req, res)=>{
    const user = await User.findById(req.body.userId)
    const postBody = {
        ...req.body,
    }
    const newPost = new Post(postBody);
    try{
        const savePost = await newPost.save();
        const PostCompleteDetail = {
            userDetails:{
                id:user._id,
                username:user.username,
                name:user.name,
            },
            postDetails:{
                postId:savePost._doc._id,
                postBody:savePost._doc.body
            }
        }
        res.status(200).json(PostCompleteDetail);
    }catch(err){
        res.status(500).json(err);
    }
});


//Update Post
Router.put("/:id", async (req, res)=>{
    try{

        const post = await Post.findById(req.params.id);
        const user = await User.findById(post.userId);
        console.log("Post: ",post);
        
        if(req.body.userId != post.userId){
            res.status(401).json("you can only update your post");
        }
    
        try{
            const updatedPost = await Post.findByIdAndUpdate(post._id, 
                req.body
            , {new:true});
            
            const PostCompleteDetail = {
                userDetails:{
                    id:user._id,
                    username:user.username,
                    name:user.name,
                },
                postDetails:{
                    postId:updatedPost._doc._id,
                    postBody:updatedPost._doc.body
                }
            }

            res.status(200).send(PostCompleteDetail);
        }catch(err){
            res.status(500).send(err);
        }
        console.log("Reached here 3");

    }catch(err){
        res.status(404).send(err);
    }
});

//Delete Post
Router.delete("/:id", async (req, res)=>{
    try{
        console.log("post")
        const post = await Post.findById(req.params.id);
        console.log(post)
        if(req.body.userId != post.userId){
            console.log("post")
            res.status(401).send("You can only delete your post");
        }
        console.log("post")
        try{
            await Comment.deleteMany({postId : post._id })
            await post.delete();
            res.status(200).send("post delete successfully")
        }catch(err){
            res.status(500).send(err);
        }
        
    }catch(err){
        res.status(404).send(err);
    }
})

//Post detail
Router.get("/:id", async (req, res)=>{
    try{    
        const post = await Post.findById(req.params.id)
        const user = await User.findById(post.userId);
        console.log(user)
        const PostCompleteDetail = {
            userDetails:{
                id:user._id,
                username:user.username,
                name:user.name,
            },
            postDetails:{
                postId:post._doc._id,
                postBody:post._doc.body
            }
        }
        res.send(PostCompleteDetail).status(200)
    }catch(err){    
        res.send(err).status(500)
    }
})


module.exports = Router;





