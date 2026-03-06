// express isn't used directly in this controller; it's handled by the router
const postModel = require("../model/post.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");


const imagekit = new ImageKit({
  privateKey: process.env.PRIVATE_KEY,
});



const createPostController = async (req, res) => {
    console.log(req.body, req.file);

    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: "Test",
    });

    res.send(file);
}

module.exports = {
    createPostController
}