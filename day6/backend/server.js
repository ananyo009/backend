const server = require("./src/app")

require("dotenv").config()

const connectToDB = require("./src/config/database")

connectToDB()


server.listen(3000, () => {
    console.log("server is running at port no. 3000")
})


