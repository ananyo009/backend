//server ko run karna
// server ko database se connect karna



const server = require("./src/app.js")
const connecttoDB = require("./src/config/database.js")
require("dotenv").config()

connecttoDB()


server.listen(3000, () => {
    console.log("server is running at port 3000")
})