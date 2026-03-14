const connectDB = require("./src/config/database");

const server = require("./src/app");

require("dotenv").config();



const connectTOdb = require("./src/config/database")

// 1. Check if Environment Variables are actually loading
console.log("--- Environment Variable Check ---");
console.log("IMAGEKIT_PRIVATE_KEY:", process.env.IMAGEKIT_PRIVATE_KEY ? "✅ Loaded" : "❌ MISSING");
console.log("MONGO_URI:", process.env.MONGO_URI ? "✅ Loaded" : "❌ MISSING");
console.log("---------------------------------");

connectTOdb();

server.listen(5000, () => {
    console.log("server is running at port no. 5000");
})