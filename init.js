import http from "http";
import express from "express";
import cors from "cors";
import apiRouter from "./api/apiRouter.js";
import { Server } from "socket.io";
import dotenv from "dotenv";
import socket from "./socket/socket.js";
dotenv.config("./.env");
export const app = express();
app.use(cors({ allowedHeaders: { origin: process.env.CLIENT_PORT } }));
app.use("/api", apiRouter);

app.get("/", (req, res) => {
  switch (process.env.NODE_ENV) {
    case "test":
      res.send("test");
      break;
    case "dev":
      res.send("dev");
      break;
    default:
      res.send("I dont know");
  }
});
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
const getUserFromToken = (token) => token;

server.listen(process.env.SERVER_PORT, () => {
  console.log("start", process.env.SERVER_PORT);
});
