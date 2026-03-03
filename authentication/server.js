const connectDB = require("./src/config/database");

const server = require("./src/app");

require("dotenv").config();

const connectTOdb = require("./src/config/database")

connectTOdb();

server.listen(5000, () => {
    console.log("server is running at port no. 5000");
})