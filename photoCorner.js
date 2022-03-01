//GET THE NECESSARY PACKAGES AND PORTS
const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')
const cors = require('cors')
const mongoose = require('mongoose')
require("dotenv").config()
const PORT = process.env.PORT || 8080
const http = require('http')


// const URL = "mongodb+srv://Precieux:eVrjX6PfhqMc3Mub@cluster0.h5zmc.mongodb.net/Photo_Corner"
const URL = "mongodb://0.0.0.0:27017/Photo_Corner";

//DECLARE APP AND GIVE IT A PORT TO LISTEN TO
const app = express()
http.createServer(app) //.listen(8080)
app.use(bodyParser.json())
app.use(cors({ origin: "*" }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.listen(PORT, () => {
    console.log("Listening on port " + PORT + " is a " + " success.");
})

//CREATE DATABASE CONNECTION WITH MONGODB ATLAS
const dbConnection = () => {
    mongoose.connect(URL, (err, db) => {
        if (err) console.log(err);
        console.log("CONNECTED TO DB SUCCESFULLY");
    })
}
dbConnection()
app.get('/', async (req, res) => {
    return res.status(200).send("WELCOME TO PHOTO CORNER")
})
app.use("/user", require("./routes/user"))

// UPLOAD PICTURES
const upload = multer({
    dest: '/images',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
            cb(new Error('Please upload an image'))
        }
        cb(undefined, true)
    }
})
app.post('/upload', upload.single('image'), (req, res) => {
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

app.use("/upload", express.static("images"));


//ROUTES FROM POST
app.use("/post",require('./routes/posts'))