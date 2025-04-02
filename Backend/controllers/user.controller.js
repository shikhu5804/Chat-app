const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/utils");
const cloudniary = require("../utils/cloudinary");

module.exports.signup = async (req, res) => {
  const { fullname, email, password, profilepic } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);
  const alreadyExists = await userModel.findOne({ email });
  if (alreadyExists) {
    res.status(400).json({ message: "Email already exists" });
  }

  if (!fullname || !email || !password) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  if (password.length < 6) {
    res
      .status(400)
      .json({ message: "Password should be at least 6 characters long" });
  }
  try {
    const user = await userModel.create({
      fullname,
      email,
      password: hashPassword,
      profilepic,
    });

    if (user) {
      const token = generateToken(user._id, res);
      res.status(201).json({ user, token });
      // res.status(200).json({ message: "User created successfully" });
    } else {
      res.status(400).json({ message: "Failed to create user" });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  if (password.length < 6) {
    res
      .status(400)
      .json({ message: "Password should be at least 6 characters long" });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id, res);
    res.status(201).json("User logged in successfully");
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.logout = (req, res) => {
  try {
    res.cookie("token", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.updateProfile = async (req, res) => {
  try {
    const { profilepic } = req.body;
    const userId = req.user._id;

    if (!profilepic) {
      return res.status(400).json({ message: "Please select an image" });
    }

    const uploadResponse = await cloudniary.uploader.upload(profilepic);
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { profilepic: uploadResponse.secure_url },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};


// module.exports.searchUser = async (req, res) => {
//   const { email } = req.query;

//   if (!email) {
//     return res.status(400).json({ message: "Email is required" });
//   }

//   try {
//     const user = await userModel.findOne({ email }).select("fullname email profilepic");
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.status(200).json(user);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// module.exports.sendFriendRequest = async (req, res) => {
//   const { targetUserId } = req.body;
//   const userId = req.user._id;
//   console.log(userId, targetUserId);

//   if (userId === targetUserId) {
//     return res.status(400).json({ message: "You cannot send request to yourself" });
//   }

//   try {
//     const user = await userModel.findById(userId);
//     const targetUser = await userModel.findById(targetUserId);

//     if (!user || !targetUser) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const existingRequest = user.friends.find((f) => f.userId.toString() === targetUserId);

//     if (existingRequest) {
//       existingRequest.status = existingRequest.status === "pending" ? "none" : "pending";
//     } else {
//       user.friends.push({ userId: targetUserId, status: "pending" });
//     }

//     await user.save();
//     res.status(200).json({ message: "Friend request sent", status: "pending" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
