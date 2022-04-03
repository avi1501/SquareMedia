const router = require("express").Router();
const User = require("../models/User");

function isPresent(array, userId){
    
    return array.includes(userId);
}

router.post("/followUser", async(req, res)=>{
    try{
        const user = await User.findById(req.body.userId);
        if(!user){
            res.status(403).send("Invalid request")
        }
        const userToFollow = await User.findById(req.body.userToFollowId);
        if(!userToFollow){
            res.status(403).send("Invalid request")
        }
        
        // if(isPresent(user.following, userToFollow._id) || isPresent(userToFollow.followers, user._id)){
        //     res.status(400).send("User already Follows this user")
        // }

        await User.findByIdAndUpdate(user._id, {
            following:[...user.following, userToFollow._id],
        }, { new:true })
        console.log("catch4",user._id)
        
        await User.findByIdAndUpdate(userToFollow._id, {
            followers:[...userToFollow.followers, user._id],
        })
        console.log("catch5")
        res.status(200).send("User successfully Followed");
    }catch(err){
        res.status(400).send("Some Error Occur")
    }
});



router.post("/unfollowUser", async(req, res)=>{
    try{
        const user = await User.findById(req.body.userId);
        if(!user){
            res.status(403).send("Invalid request")
        }
      
        const userToUnfollow = await User.findById(req.body.userToUnfollowId);
        if(!userToUnfollow){
            res.status(403).send("Invalid request")
        }
   
        
        // if(isPresent(user.following, userToFollow._id) || isPresent(userToFollow.followers, user._id)){
        //     res.status(400).send("User already Follows this user")
        // }
        

        user.following = user.following.filter((item)=>{
           return item+"" != userToUnfollow._id
        })    

        userToUnfollow.followers = userToUnfollow.followers.filter((item)=>{
            return item+"" != user._id;
        })
        await User.findByIdAndUpdate(user._id, {
            following:user.following
        })
        await User.findByIdAndUpdate(userToUnfollow._id, {
            followers:userToUnfollow.followers
        })

        res.status(200).send("User successfully UnFollowed");
    }catch(err){
        res.status(400).send("Some Error Occur")
    }
});


module.exports = router