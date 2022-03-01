const mongoose = require('mongoose')
const postSchema = new mongoose.Schema({
    created:{},
    userName:{
        type:String,
        maxlength:50,
        minlength:3
    },
    caption:{
        type:String,
        maxlength:4000,
        minlength:0
    }
})
module.exports.postSchema = mongoose.model("posts",postSchema)