const express = require('express')
const { newPost,deletePost } = require('../controllers/post')
const postRouter = express.Router()
postRouter.post("/newPost",newPost)
postRouter.delete("/deletePost",deletePost)
module.exports = postRouter
