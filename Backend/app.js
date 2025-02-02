const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const userRoute = require("./routes/user.route");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectToDb = require("./db/db");
connectToDb();
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRoute);

module.exports = app;
