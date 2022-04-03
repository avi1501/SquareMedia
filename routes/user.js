const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment")
const bcrypt = require("bcrypt");


//GET user 
router.get("/:username", async (req, res)=>{

    try{
        const user = await User.findOne({username:req.params.username})
        const { password , ...userDetails} = user._doc;
        
        var post = await Post.find({userId:user._id})

        for(var i=0;i<post.length;i++){
            var { userId, ...others} = post[i]._doc;
            post[i] = others;
        }
        const userData = {
            userDetails:userDetails,
            posts:post
        }
        res.send(userData).status(200)
    }catch(err){
     
        res.status(400).json(err);
    }

})

//Update 
router.put("/:id", async (req, res)=>{
    if(req.body.userId === req.params.id){
        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try{
            const updateUser = await User.findByIdAndUpdate(req.params.id, {
                $set:req.body,
            },{ new:true });

            const { password, ...others } = updateUser._doc;
            res.status(200).send(others);

        }catch(err){
            console.log(err);
        }
    }else{
        res.status(401).send("You can only update your account");
    }
});

//Delete 
router.delete("/:id", async (req, res)=>{
    if(req.params.id === req.body.userId){
        
        
        const user = await User.findById(req.body.userId);
      
        if(!user){
            res.status(404).send("User not found");   
        }
       
        try{
            await Post.deleteMany({userId : user._id})
     
            await Comment.deleteMany({userId : user._id })
        
            await User.findByIdAndDelete(user._id);
        
            res.status(200).send("User has been deleted");
        
        }catch(err){
            res.status(500).send("err in internal server");
        }
    }else{
        res.status(401).send("You can only delete your account")
    }
});






module.exports = router;