const postModel = require("../model/post.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs")
const jwt = require("jsonwebtoken")
const likeModel = require("../model/likes.model");

// Polyfill for File global (required for ImageKit in Node.js < 20)
if (!globalThis.File) {
  const { File } = require("buffer");
  globalThis.File = File;
}

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

// Verify ImageKit is initialized
console.log("ImageKit initialized:", {
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY ? "✓ Set" : "✗ Missing",
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY ? "✓ Set" : "✗ Missing",
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT ? "✓ Set" : "✗ Missing"
});

const createPostController = async (req, res) => {

    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded"
      })
    }

    // Upload to ImageKit
    const file = await imagekit.files.upload({
      file: await toFile(Buffer.from(req.file.buffer),'file'),
      fileName: "test",
      folder:"insta-clone/posts"
    })

    console.log("ImageKit upload response:", file);

    // Create post in database
    const post = await postModel.create({
      imageUrl: file.url,
      caption: req.body.caption || "",
      user: req.user.userid
    })

    res.status(201).json({
      message: "Post created successfully",
      post: post,
      imageUrl: file.url
    })
  }

const getPostsController = async (req, res) => {
 
  const posts = await postModel.findOne({
    user: req.user.userid
  })

  res.status(200).json({
    message: "Posts retrieved successfully",
    posts: posts
  })
}

const postDetailsController = async (req, res) => {

  

  const userId = req.user.userid;

  const postId = req.params.postId;

  const post = await postModel.findById(postId);

  if (!post) {
    return res.status(404).json({
      message:"post not found"
    })
  }

  const isValiduser = post.user.toString() === userId;

  if (!isValiduser) {
    return res.status(403).json({
      message:"you are not authorized to access this post"
    })
  }

  res.status(200).json({
    message:"post details retrieved successfully",
    post: post
  })


}

const likePostController = async (req, res) => {
  const postId = req.params.postId;

  const username = req.user.username;

  const post = await postModel.findById(postId)

  if (!post) {
    return res.status(404).json({
      message: "post not found"
    })
  }
  
  const like = await likeModel.create({
    postId: postId,
    user: username
  })

  return res.status(201).json({
    message: `post liked succesfully by ${username}`,
    like 
  })

  }

module.exports = {
    createPostController,
  getPostsController,
  postDetailsController,
  likePostController
}