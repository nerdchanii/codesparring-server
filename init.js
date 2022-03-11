import http from "http";
import express from "express";
import cors from "cors";
import apiRouter from "./api/apiRouter.js";
import { Server } from "socket.io";
import dotenv from "dotenv";
import socket from "./socket/socket.js";
import bodyParser from "body-parser";
import mysql from "mysql2"; // mysql 사용
import { varifyAccessToken } from "./middleware/jwt/jwt.js";

dotenv.config("./.env");

export const app = express();
// app.use(cors({ origin: process.env.CLIENT_PORT }));
app.use(cors());
app.use(bodyParser.json());
app.options("*", cors());

app.use("/api", apiRouter);

// socket io
export const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_PORT,
  },
});
io.on("connect", socket);

io.use((socket, next) => {
  if (socket.handshake.auth.token) {
    socket.username = getUserFromToken(socket.handshake.auth.token);
    next();
  } else {
    next(new Err("Please Send Token"));
  }
});

//getUserFromToken은 데이버테이스에서 조회하는 로직이 필요
const getUserFromToken = (token) => {
  try {
    const { nickName } = varifyAccessToken(token);
    return nickName;
  } catch (e) {
    console.log(token);
    return token.nickName;
  }
};

server.listen(process.env.SERVER_PORT, () => {
  console.log("start", process.env.SERVER_PORT);
});
