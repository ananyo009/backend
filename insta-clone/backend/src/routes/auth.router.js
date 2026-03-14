const express = require("express");
const controller = require("../controller/auth.controller")
const authRouter = express.Router();

const indentifyUser = require("../middleware/post.middleware")

authRouter.post("/register", controller.registerController)    

authRouter.post("/login", controller.loginController)


authRouter.get("/get-me",indentifyUser,controller.getMecontroller)




module.exports = authRouter;