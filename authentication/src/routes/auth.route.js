const express = require('express');

const authRouter = express.Router();
const userModel = require("../model/user.model")
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser")

authRouter.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    
    const isemailexist = await userModel.findOne({ email })
    if(isemailexist){
        return res.status(409).json({
            message:"email already exists"
        })
    }

    const user = await userModel.create({
        name,
        email,
        password: crypto.createHash("md5").update(password).digest("hex")
    })

    const token = jwt.sign({
        id:user._id
    }, process.env.JWT_SECRET, { expiresIn: "1hr" })

    res.cookie("pyaar_ka_token", token)

    res.status(201).json({
        message:"registered successfully",user, token
    })
})

authRouter.get("/get-me", async (req, res) => {
    const token = req.cookies.pyaar_ka_token;
    
    const decoder = jwt.verify(token, process.env.JWT_SECRET);

    // console.log(decoder);

    const user = await userModel.findById(decoder.id)

    res.status(200).json({
        message: "user details",
        user: {
            name: user.name,
            email: user.email
        }
    })
})  

authRouter.post("/login", async (req, res) => {

    const {email, password } = req.body;
    
    const user = await userModel.findOne({ email })

    if (!user) {
        return res.status(404).json({
            message:"user not found"
        })
    }
    const hash = crypto.createHash("md5").update(password).digest("hex");

    const isPasswordCorrect = hash === user.password;

    if (!isPasswordCorrect) {
        return res.status(401).json({
            message:"invalid password"
        })
    }

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET, { expiresIn: "1hr" })

    res.cookie("login_token", token)
    
    res.status(200).json({
        message:"user logged in successfully",
        user,
        token
    })


 })

module.exports = authRouter;    