const userModel = require("../models/user.model");
const messageModel = require("../models/message.model");
const cloudinary = require("../utils/cloudinary");
const { getReceiverSocketId, getIo } = require("../utils/socketutilis");

module.exports.getUsers = async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    const users = await userModel
      .find({ _id: { $ne: loggedInUser } })
      .select("-password");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    const messages = await messageModel.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.sendMessages = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl = "";
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image, {});
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = await messageModel.create({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      getIo().to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(200).json(newMessage);
  } catch (err) {
    console.error("Error in sendMessages:", err);
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};
