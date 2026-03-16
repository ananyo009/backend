

const bcrypt = require("bcryptjs");
const userModel = require("../model/user.model");

const jwt = require("jsonwebtoken");


const registerController = async (req, res) => {
  const { username, email, password, bio, Profileimage } = req.body;

  const isUserAlreadyExist = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserAlreadyExist) {
    return res.status(409).json({
      message:
        "user already exists" +
        (isUserAlreadyExist.email === email
          ? "email already exists"
          : "username already exists"),
    });
  }

  const user = await userModel.create({
    username,
    email,
    password: await bcrypt.hash(password, 10),
    bio,
    Profileimage,
  });

  const token = jwt.sign(
    {
      userid: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "registered successfully",
    token: token,
    email: user.email,
    username: user.username,
    bio: user.bio,
    Profileimage: user.Profileimage,
  });
};

const loginController = async (req, res) => {
  const { username, email, password } = req.body;

  const User = await userModel.findOne({
    $or: [{ username: username }, { email: email }],
  }).select("+password");

  if (!User) {
    return res.status(404).json({
      message: "user does not exists",
    });
  }

  const isPasswordCorrect = await bcrypt.compare(password, User.password);

  if (!isPasswordCorrect) {
    return res.status(401).json({
      message: "password is incorrect",
    });
  }

  const token = jwt.sign(
    {
      userid: User._id,
      username: User.username
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "login successful",
    user: {
      token: token,
      email: User.email,
      username: User.username,
      bio: User.bio,
      Profileimage: User.Profileimage,
    }
  });
};

async function getMecontroller(req ,res) {
  const userId = req.user.userid

  const user = await userModel.findById(userId)

  res.status(200).json({
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profilePic: user.Profileimage,
      userId:user._id
    }
  })

}

module.exports = {
    registerController,
  loginController,
    getMecontroller
}