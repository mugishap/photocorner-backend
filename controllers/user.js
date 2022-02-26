const { userSchema } = require("../models/user")
const bcrypt = require('bcrypt')
const express = require("express")

exports.registerUser = async (req, res) => {
    let hashedPassword = await bcrypt.hash(req.body.password, 8)
    const user = await new userSchema({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        email: req.body.email,
        password: hashedPassword,
    })
    await user.save()
    if (!user)
        res.status(400).send("ACCOUNT NOT CREATED")
    else
        res.status(200).send("ACCOUNT SUCCESSFULLY CREATED")

}
exports.getUser = async (req, res) => {
    let err = "No such user named " + req.params.name + " in our database"
    const user = await userSchema.find({
        userName: { $regex: `^${req.params.name}$`, $options: 'i' }
    })
    if (user = {}) {
        return res.status(404).send(err)
    } else {
        return res.status(200).send(user)

    }
}