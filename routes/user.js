const express = require("express");
const { registerUser, getUser } = require("../controllers/user");
const router = express.Router()

router.post("/newUser", registerUser);
router.get('/getUser',getUser)
module.exports = router;
