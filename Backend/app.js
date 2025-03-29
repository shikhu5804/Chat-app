const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectToDb = require("./db/db");
const userRoute = require("./routes/user.route");
const messageRoute = require("./routes/message.route");
const { initializeSocket } = require("./utils/socketutilis");

const app = express();
const server = http.createServer(app);  // ✅ Create server

// Connect to MongoDB
connectToDb();

app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);

// Initialize socket
initializeSocket(server);  // ✅ Initialize socket

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
