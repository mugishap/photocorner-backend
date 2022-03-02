const express = require("express");
const { registerUser, getUser, updateUser, deleteUser, allUsers,confirmUser } = require("../controllers/user");
const fileUpload = require("../middlewares/fileUpload");
const userRouter = express.Router()

userRouter.post("/registerUser", registerUser);
userRouter.get('/getUser/:name',getUser)
userRouter.get('/allUsers',allUsers)
userRouter.post('/confirmUser',confirmUser)
userRouter.put('/updateUser/:name',updateUser)
userRouter.delete('/deleteUser/:name',deleteUser)
module.exports = userRouter;
