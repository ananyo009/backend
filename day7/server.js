const server = require('./src/app')

require("dotenv").config()

const connectTodb = require("./src/config/database")

connectTodb();


server.listen(3000, () => {
    console.log("server is running successfully");
})