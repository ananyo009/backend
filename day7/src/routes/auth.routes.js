const express = require("express");
const crypto = require("crypto");
const userModel = require("../model/user.model")

const jwt = require("jsonwebtoken")




authRouter = express.Router()


authRouter.post("/register", async (req, res) => {
    
    const { name, email, password } = req.body
    const hash = crypto.createHash("md5").update(password).digest("hex");

   
    const isUseralreadyExist = await userModel.findOne({ email })
    
    if (isUseralreadyExist) {
        return res.status(409).json({
            message:"user already exists"
        })
    }
    
    const user = await userModel.create({
        name, email , password:hash
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

authRouter.post("/protected", (req, res) => {
    console.log(req.cookies);

    res.status(200).json({
        message:"this site is protected"
    })
})

authRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email })


    if (!user) {
        return res.status(404).json({
            message:"user does not exists",
        })
    }
    const isPassword = user.password === crypto.createHash("md5").update(password).digest("hex");
    if (!isPassword) {
        return res.status(401).json({
            message:"invalid password"
        })
    }

    const token = jwt.sign({
        id: user._id
    },process.env.JWT_SECRET)
    
    res.cookie("login_token", token)
    
    res.status(200).json({
        message:"user logged in successfully",user,token
    })
})


module.exports = authRouter