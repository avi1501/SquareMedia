const mongoose = require("mongoose");

const profileObj = {
    username:{
        type:String,
        require:true,
        unique:true,
    },
    name:{
        type:String,
    },
    bio:{
        type:String,
    },
    followers:{
        type:String,
    },
    followings:{
        type:String,
    },
}

const ProfileSchema = new mongoose.Schema(profileObj, {timestamps:true});

module.exports = mongoose.model("Profile", ProfileSchema);