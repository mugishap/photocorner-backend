//GET THE NECESSARY PACKAGES AND PORTS
const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')
const cors = require('cors')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { userSchema } = require('./pc.userSchema')
require("dotenv").config()
const PORT = process.env.PORT || 8080
const URL = "mongodb+srv://Precieux:eVrjX6PfhqMc3Mub@cluster0.h5zmc.mongodb.net/Photo_Corner"

//ONLINE AND OFFLINE URLs

//mongodb+srv://Precieux:eVrjX6PfhqMc3Mub@cluster0.h5zmc.mongodb.net/Photo_Corner
//mongodb://localhost:27017/Photo_Corner

//DECLARE APP AND GIVE IT A PORT TO LISTEN TO
const app = express()
app.use(cors({origin: "*"}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.listen(PORT, () => {
    console.log("Listening on port " + PORT + " is a " + " success.");
})

//CREATE DATABASE CONNECTION WITH MONGODB ATLAS

const dbConnection = () => {
    mongoose.connect(URL, () => {
        console.log("CONNECTED TO DB SUCCESFULLY");
    })
}
dbConnection()

//GET API FOR TEST

app.get('/', async (req, res) => {
    return res.status(200).send("WELCOME TO PHOTO CORNER")
})

//THE CREATE USER APIs IMPORTED SCHEMA FROM PHOTO CORNER USER SCHEMA

app.use("/user", require("./routes/user"))

//GET USER APIs USING DIFFERENT CREDENTIALS
//GET ALL USERS
app.get('/users', async (req, res) => {
    const users = await userSchema.find()
    console.log(users[3].firstName)
    return res.status(200).send({
        count: users.length,
        data: users
    })
})
//GET USER BY NAME
app.get('/getuser/:name', async (req, res) => {


})
//UPDATE USER
app.put('/update/:name', async (req, res) => {
    let err = "No such user named " + req.params.name + " in our database"
    let hashedPassword = await bcrypt.hash(req.body.password, 8)
    let userId = (user[0]._id).toString()
    const user = await userSchema.find({
        userName: { $regex: `^${req.params.name}$`, $options: 'i' }
    })
    user.findByIdAndUpdate(userId, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        email: req.body.email,
        password: hashedPassword,
    })

    console.log((user[0]._id).toString())
    //  neededUser.save()
    return res.status(200).send(user)
})
//DELETE ACCOUNT
app.delete('/deleteAcount/:name', async (req, res) => {
    const user = await userSchema.find({
        userName: { $regex: `^${req.params.name}$`, $options: 'i' }
    })
    let userId = user[0]._id
    const needed = await userSchema.findByIdAndDelete(userId)
    return res.status(200).send("ACCOUNT DELETED SUCCESSFULLY")

})

//UPLOAD PICTURES
const { append } = require('express/lib/response')
const upload = multer({
    dest: 'images',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req,file,cb){
        if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
            cb(new Error('Please upload an image'))
        }
        cb(undefined,true)
    }
})

app.post('/upload', upload.single('upload'), (req, res) => {
    res.send()
})
// router.post('/upload', upload.single('upload'), (req, res) => {
//     res.send()
//     }, (error, req, res, next) => {
//     res.status(400).send({error: error.message})
//     })

// const express = require("express")
// const app =express();
// app.use(express.json())
// app.use(express.urlencoded({extended: true}))

// app.get("/", async(req,res)=>{
//     console.log("1")
//     return res.status(200).send("WELCOME TO PHOTO CORNER")
// })

// app.listen(8000, ()=>{
//     console.log("server is running")
// })