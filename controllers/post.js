const express = require('express')
const { postSchema } = require('../models/posts')
exports.newPost = async (req, res) => {
    // console.log(req.body)
    // return res.json({message: "Got the info"})
    let now = new Date()
    let day,time
    switch (now.getDay()) {
        case 1:
            day = "Monday"
            break;
        case 2:
            day = "Tuesday"
            break;
        case 3:
            day = "Wednesday"
            break;
        case 4:
            day = "Thursday"
            break;
        case 5:
            day = "Friday"
            break;
        case 6:
            day = "Saturday"
            break;
        case 7:
            day = "Sunday"
            break;
        default:
            break;
    }
    if (now.getMinutes() < 10) {
        time = day + " at " + now.getHours() + ":0" + now.getMinutes()
    }
    else{
        time = day + " at " + now.getHours() + ":" + now.getMinutes()
    }
    let post = new postSchema({
        created: day + " at " + now.getHours() + ":" + now.getMinutes(),
        userName: req.body.userName,
        caption: req.body.caption
    })
    if (!post) return res.status(400).json({message: "POST WAS NOT UPLOADED"})
    await post.save()
    return res.status(200).json(post)
}
exports.allPosts = async(req,res)=>{
    let posts = await postSchema.find()
    return res.status(200).send(posts)
}
exports.deletePost = async (req, res) => {
    await postSchema.findByIdAndDelete(req.params.id)
    return res.status(200).json({message:"POST WAS DELETED SUCCESFULLY"})
}
