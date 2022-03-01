const express = require('express')
const { postSchema } = require('../models/posts')
exports.newPost = async (req, res) => {
    let now = new Date()
    let day,state
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
    if (now.getHours() < 12) {
        state = "AM"
    }
    else {
        state = "PM"
    }
    let post = new postSchema({
        created: day + " at " + now.getHours() + " " + state,
        userName: req.body.userName,
        caption: req.body.caption
    })
    if (!post) return res.status(400).send("POST WAS NOT UPLOADED")
    await post.save()
    return res.status(200).send(post)
}
exports.deletePost = async (req, res) => {
    await postSchema.findByIdAndDelete(req.params.id)
    return res.status(200).send("POST WAS DELETED SUCCESFULLY")
}
