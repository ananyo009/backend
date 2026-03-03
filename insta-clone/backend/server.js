const server = require("./src/app");
const connectDB = require("./src/config/database")

require('dotenv').config()

connectDB();

server.listen(3000, () => {
    console.log("server is running on port 3000");
})