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
    let hashedPassword = await bcrypt.hashSync(req.body.password, 20, (err, hash) => {
        if (err) console.log("Error in hashing pasword")
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
        await user.save()
        res.status(201).json({message:"Account created"})
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
