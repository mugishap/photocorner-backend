const express = require('express')
const { newPost,deletePost, allPosts } = require('../controllers/post')
const postRouter = express.Router()
postRouter.post("/newPost",newPost)
postRouter.delete("/deletePost",deletePost)
postRouter.get("/allPosts",allPosts)
module.exports = postRouter
