const mongoose = require("mongoose");

const userObj = {
    name:{
        type:String,
        require:true,
    },
    bio:{
        type:String,
        require:false,
    },
    location:{
        type:String, 
        require:false
    },
    username:{
        type:String,
        require:true,
        unique:true,
        minlength:5
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
        minlength:5,
    },
    followers:[
        {
                type:mongoose.Schema.Types.ObjectId,
                ref:"User"
        }
    ],
    following:[
       {
                type:mongoose.Schema.Types.ObjectId,
                ref:"User"
        }
    ]
};


const UserSchema = new mongoose.Schema(userObj, {timestamps:true});

module.exports = mongoose.model("User", UserSchema);