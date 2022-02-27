const express = require("express");
const { registerUser, getUser, updateUser, deleteUser, allUsers } = require("../controllers/user");
const fileUpload = require("../middlewares/fileUpload");
const router = express.Router()

router.post("/registerUser", fileUpload.single("image"), registerUser);
router.get('/getUser/:name',getUser)
router.get('/allUsers',allUsers)
router.put('/updateUser/:name',updateUser)
router.delete('/deleteUser/:name',deleteUser)
module.exports = router;
