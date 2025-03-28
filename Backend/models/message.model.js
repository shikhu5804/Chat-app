const mongoose = require("mongoose")

const messageSchema = new mongoose.Schema({
    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    receiverId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    text:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        default: "",
    },
},
{timestamps: true}
)

const messageModel = mongoose.model("message", messageSchema)

module.exports = messageModel