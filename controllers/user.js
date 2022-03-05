const { userSchema } = require("../models/user")
const bcrypt = require('bcrypt')
const express = require("express")
const jwt = require('jsonwebtoken')
require('dotenv').config()
const nodemailer = require('nodemailer')

exports.registerUser = async (req, res) => {

    let users = await userSchema.find()
    for (let i = 0; i < users.length; i++) {
        if (req.body.userName == users[i].userName) {
            return res.status(400).json({ message: "User with that username already exists" })
        } else if (req.body.email == users[i].email) {
            return res.status(400).json({ message: "User with that email already exists" })
        }
    }
    try {
        let hashedPassword = await bcrypt.hashSync(req.body.password, 20, (err, hash) => {
            if (!err) console.log("Error in hashing pasword")
            else console.log(hash)
        })
        const user = new userSchema({
            fullName: req.body.fullName,
            userName: req.body.userName,
            email: req.body.email,
            password: hashedPassword,
        })

        if (!user) return res.status(400).json("ACCOUNT NOT CREATED")
        else {
            const token = jwt.sign({ user_id: user._id }, process.env.TOKEN_KEY, { expiresIn: "2h" })
            user.token = token
            // await user.save()
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASSWORD
                }
            });

            let mailOptions = {
                from: 'precieuxmugisha@gmail.com',
                to: req.body.email,
                subject: 'Trying to send email using nodemailer',
                // text:'Nodemailer helps to send emails from one account to another through an easy way this keeps people updated about thir accounts everywhere they are.',
                html: "<head> <style>#main{background-color: rgba(109, 99, 109, 0.89); color: white; margin: auto; display: flex; flex-flow: row; justify-content: center; align-items: center; width: 80%; border-radius: 10px; padding: 20px; height: 250px; box-sizing: border-box;}.top{box-shadow: 0px 2px 100px black; display: flex; flex-direction: row; align-items: center; height: 80%; background-color: rgb(46 44 56); border-top-left-radius: 10px; border-bottom-left-radius: 10px; padding: 20px; width: 80%; box-sizing: border-box;}.bottom{box-shadow: 0px 2px 100px black; width: 80%; height: 80%; display: flex; flex-direction: column; background-color: white; color: black; font-weight: bold; text-align: center; border-top-right-radius: 10px; border-bottom-right-radius: 10px; padding: 10px; box-sizing: border-box;}img{width: 50px; height: 50px; margin-right: 20px;}body{font-family: Ubuntu;}#h3{text-align: left;}#number{font-size: x-large; position: fixed; transform: translate(90px,80px);}</style> <link rel='preconnect' href='https://fonts.googleapis.com'> <link rel='preconnect' href='https://fonts.gstatic.com' crossorigin> <link href='https://fonts.googleapis.com/css2?family=Smooch&family=Ubuntu:wght@300&display=swap' rel='stylesheet'></head><body onload='playText()'> <div id='main'> <div class='top'> <img src='/images/logo.png' alt='Photo corner logo'> <h1>Welcome to PHOTOCORNER</h2> </div><div class='bottom'> <h3 id='h3'></h3> <p id='number'></p></div><br></div><script>let randomNumber=Math.floor(Math.random() * (999999 - 100000) + 100000); document.getElementById('number').innerHTML=randomNumber; var i=0; function playText(){let text='Your verification code is written below.This code will expire in two hours time.'; if (i < text.length){document.getElementById('h3').innerHTML +=text.charAt(i); i++; setTimeout(playText, 100);};}; </script></body>"
            }
            let response
            transporter.sendMail(mailOptions, (error, info) => {
                if (error)
                    console.log('Email not sent: ' + error)
                else
                    console.log({ message: 'Email sent' }); response = "Email sent"
            });
            if (response === "Email sent") {
                return res.status(200).json({ message: "Check your email for verification code and write it below" })
            }
            else {
                return res.status(200).json({ message: "Error in sending email verification. Try signing up again" })
            }
        }
    } catch (error) {
        console.log(error);
    }


}
exports.getUser = async (req, res) => {
    let err = "No such user named " + req.params.name + " in our database"
    const user = await userSchema.find({
        userName: { $regex: `^${req.params.name}$`, $options: 'i' }
    })
    if (user == {}) {
        return res.status(404).send(err)
    } else {
        return res.status(200).send(user)
    }
}
exports.updateUser = async (req, res) => {
    let err = "No such user named " + req.params.name + " in our database"
    let hashedPassword = await bcrypt.hash(req.body.password, 10)

    const user = await userSchema.find({
        userName: { $regex: `^${req.params.name}$`, $options: 'i' }
    })
    let userId = (user[0]._id).toString()

    userSchema.findByIdAndUpdate(userId, {
        fullName: req.body.fullName,
        userName: req.body.userName,
        email: req.body.email,
        password: hashedPassword,
    })
    let now = new Date()
    console.log("User with ID " + (user[0]._id).toString() + "was updated at " + now.toLocaleTimeString)
    //  neededUser.save()
    return res.status(200).json({ newUser: user })
}
exports.deleteUser = async (req, res) => {
    const user = await userSchema.find({
        userName: { $regex: `^${req.params.name}$`, $options: 'i' }
    })
    let userId = user[0]._id
    const needed = await userSchema.findByIdAndDelete(userId)
    return res.status(200).send("ACCOUNT DELETED SUCCESSFULLY")
}
exports.allUsers = async (req, res) => {
    const users = await userSchema.find()
    return res.status(200).json({
        count: users.length,
        data: users
    })
}
exports.confirmUser = async (req, res) => {
    let needed, message
    const users = await userSchema.find()
    for (i = 0; i < users.length; i++) {
        if (users[i].email === req.body.email) {
            needed = users[i]
            message = "Email correct "
        } else {
            message = "Email incorrect "
        }
    }
    if (message === "Email incorrect") {
        return res.status(400).json({ message: "No user found with that email" })
    } else {
        const comparison = await bcrypt.compareSync(req.body.password, needed.password, (err, res) => {
            if (err) console.log("Error in comparing password please try again")
        })
        if (comparison == true) {
            return res.status(200).json({ message: message + "and Passwords match" })
        } else {
            return res.status(400).json({ message: message + "but passwords do not match" })
        }
    }
}
