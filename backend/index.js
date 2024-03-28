import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
const app = express();
app.use(cors());

app.use(cookieParser());
app.use(express.json());

import {fileURLToPath} from "url";
dotenv.config({
  path: ".env",
});

import databaseConnection from "./config/database.js";
import userRoute from "./routes/userRoutre.js";
import tweetRoute from './routes/tweetRoute.js'
databaseConnection();

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello world ");
});

app.use("/api/v1/user", userRoute);
app.use("/api/v1/tweet", tweetRoute);

app.listen(process.env.PORT, () => {
  console.log(`Listening ${process.env.PORT}`);
});
