const express = require("express");
const controller = require("../controller/auth.controller")
const authRouter = express.Router();

authRouter.post("/register", controller.registerController)    

authRouter.post("/login", controller.loginController)




module.exports = authRouter;