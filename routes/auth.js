const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//register
router.post("/register", async(req, res)=>{
    if(!req.body.username || !req.body.email || !req.body.password){
        res.status(400).send({message:"every field is required"});
    }
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const userDetails = {
            username:req.body.username,
            email:req.body.email,
            password:hashedPassword,
        }

        const newUser = new User(userDetails);
        const user = await newUser.save();
        const { password, ...others} = user._doc;
        res.status(200).json(others);

    }catch(err){
        res.status(409).send("User already exist");
    }
})

//login 
router.post("/login", async(req, res)=>{
    
    if(!req.body.username || !req.body.password){
        res.status(400).send({message:"every field is required"});
    }

    try{
        const user = await User.findOne({
            username: req.body.username
        });

        !user && res.status(400).json("Wrong Credentials");

        const validate = await bcrypt.compare(req.body.password, user.password);

        !validate && res.send(400).json("Wrong Credentials");

        const {password,  ...others} = user._doc;

        res.status(200).send(others);

    }catch(err){
        res.send(500).json(err);
    }
})

var xyz = function(req,res, next){

}

module.exports = router;