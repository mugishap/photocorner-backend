const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        maxlength:100,
        minlength:3
    },
    userName:{
        type:String,
        maxlength:50,
        minlength:3
    },
    email:{
        type:String,
        maxlength:50,
        minlength:6
    },
    password:{
        type: String,
        // minlength:8
    }
})
module.exports.userSchema = mongoose.model("users",userSchema)