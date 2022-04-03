const Router = require("express").Router();
const User = require("../models/User")
const Post = require("../models/Post")


Router.get("/allpost", async (req, res)=>{

    try{
        const posts = await Post.find();
        console.log("OK")
        for(var i=0;i<posts.length;i++){
            console.log("OK")
            
            const user = await User.findById(posts[i].userId);
            console.log("OK")
            const post = posts[i];
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
            posts[i] = PostCompleteDetail;
        }
        res.send(posts).status(200);
    }catch(err){
     
        res.status(400).json(err);
    }

})


Router.get("/alluser", async (req, res)=>{

    try{
        console.log("hello")
        const users = await User.find()
        for(var i=0;i<users.length;i++){
            var { password, ...userDetail} = users[i]._doc;
            users[i] = userDetail;
        }
        res.send(users).status(200);
    }catch(err){
     
        res.status(400).json(err);
    }

})


module.exports = Router