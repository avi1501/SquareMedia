const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const cors = require('cors');
const app = express();

const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");
const followRoute = require("./routes/follow");
const userRoute = require("./routes/user")
const commentRoute = require("./routes/comment")
const publicRoute = require("./routes/publicData")
//starting the express app

//configuring the environment variables
dotenv.config();
app.use(cors());
app.use(express.json());

//Server connection with mongo DB code
mongoose.connect(process.env.MONGO_URL).then(
    console.log("Connected to mongoDB")
).catch((err)=>{
    console.log(err);
});



app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);
app.use("/api/comment", commentRoute);
app.use("/api/follow", followRoute);
app.use("/api/", publicRoute);



app.listen((process.env.PORT|| 5000), ()=>{
    console.log("backend is running");
})
