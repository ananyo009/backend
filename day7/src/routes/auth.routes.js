const express = require("express");

const userModel = require("../model/user.model")

const jwt = require("jsonwebtoken")




authRouter = express.Router()


authRouter.post("/register", async (req, res) => {
    
    const { name, email, password } = req.body

   
    const isUseralreadyExist = await userModel.findOne({ email })
    
    if (isUseralreadyExist) {
        return res.status(400).json({
            message:"user already exists"
        })
    }
    
    const user = await userModel.create({
        name, email , password
    })
    
    const token = jwt.sign(
        {
            userid: user._id,
            email: user.email,
            name: user.name
        },
        process.env.JWT_SECRET
    )

    res.cookie('jwt_token',token)


    res.status(201).json({
        message: "registered successful",
        user,
        token
    })
})

module.exports = authRouter