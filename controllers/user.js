const { userSchema } = require("../models/user")
const bcrypt = require('bcrypt')
const express = require("express")

exports.registerUser = async (req, res) => {
    let users = await userSchema.find({})
    for (let i = 0; i < users.length; i++) {
        if (req.body.userName == users[i].userName) {
            return res.status(400).json({ message: "User with that username already exists" })
        }
    }
    try {
        let hashedPassword = await bcrypt.hash(req.body.password, 10)
        let users = await userSchema.find()
        const user = new userSchema({
            fullName: req.body.fullName,
            userName: req.body.userName,
            email: req.body.email,
            password: hashedPassword,
        })
        let emailval
        for(i = 0;i < users.length;i++){
            if(req.body.email == users[i].email) emailval = users[i].email
        }
        if (req.body.email == emailval) return res.status(400).json("ACCOUNT NOT CREATED")
        await user.save()
        return res.status(200).json({ message: "Account with username " + req.body.userName.toUpperCase() + " was successfully created" })
    }
    catch (error) {
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
    return res.status(200).send(user)
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
    return res.status(200).send({
        count: users.length,
        data: users
    })
}
exports.confirmUser = async (req, res) => {
    let needed,message
    const users = await userSchema.find()
    for (i = 0; i < users.length; i++) {
        if (users[i].email == req.body.email) {
            needed = users[i]
            message = "Email correct "
        }
        else{
            message = "Email incorrect "
        }
    }
    console.log(req.body)
    const comparison = await bcrypt.compare(req.body.password, needed.password)
    if (comparison == true) {
        return res.status(200).send(message + "and Passwords match")
    }
    else {
        return res.status(400).send(message + "but passwords do not match")
    }
}
