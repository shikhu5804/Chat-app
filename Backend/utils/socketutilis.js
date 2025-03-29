const { Server } = require("socket.io");

const userSocketMap = {};

let io;

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  io.on("connection", (socket) => {
    console.log("✅ User connected:", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId) {
      userSocketMap[userId] = socket.id;
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
      console.log("❌ User disconnected:", socket.id);
      delete userSocketMap[userId];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
  });

  console.log("🔥 Socket initialized");
};

const getReceiverSocketId = (userId) => {
  return userSocketMap[userId];
};

const getIo = () => io;

module.exports = { initializeSocket, getReceiverSocketId, getIo };
