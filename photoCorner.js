//GET THE NECESSARY PACKAGES AND PORTS
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const multer = require('multer')
const cors = require('cors')
const mongoose = require('mongoose')
require("dotenv").config()
const PORT = process.env.PORT || 5000
const http = require('http')
const io = require('socket.io')(3000)
const fs = require("fs")
var url = require("url");
const server = http.createServer(app)

const URL = "mongodb+srv://Precieux:eVrjX6PfhqMc3Mub@cluster0.h5zmc.mongodb.net/Photo_Corner"
// const URL = "mongodb://0.0.0.0:27017/Photo_Corner";

//DECLARE APP AND GIVE IT A PORT TO LISTEN TO
app.use(bodyParser.json())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
server.listen(PORT, () => {
    console.log(`Listening on port ${PORT} is a success.`);
})


//CREATE DATABASE CONNECTION WITH MONGODB ATLAS
const dbConnection = () => {
    mongoose.connect(URL, (err, db) => {
        if (err) console.log("Error occured" + "\n\n" + err);
        console.log("Connected to database successfully");
    })
}
dbConnection()

// app.get("/chat", async (req, res) => {
//     let file = fs.readFileSync("index.html")
//     return res.end(file)
// })

// app.get('/', async (req, res) => {
//     fs.readFile('./',(err,data)=>{
//         console.log(err)
//     })
//     return res.status(200).send("WELCOME TO PHOTO CORNER")
// })

app.use("/user", require("./routes/user"))

//ROUTES FROM POST
app.use("/post", require('./routes/posts'))