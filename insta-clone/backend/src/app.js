require("dotenv").config();

const express = require("express")


const app = express();

const cors = require('cors');

const cookieParser = require("cookie-parser")

const authRouter = require("./routes/auth.router")

const postRouter = require("./routes/post.router")

const followeeRouter = require("./routes/followee.router")


app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173"
  }),
);

app.use(cookieParser());

app.use(express.json());

app.use("/api/auth", authRouter)

app.use("/api/posts", postRouter)    

app.use("/api/users", followeeRouter)


module.exports = app