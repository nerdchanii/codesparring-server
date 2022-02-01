import { io } from "../init.js";

const socket = (socket) => {
  socket.on("join", async (room) => {
    socket.join(room);
    console.log("join");

    io.to(Array.from(socket.rooms)).emit("message", {
      user: socket.username,
      message: "님이 입장하셨습니다.",
    });
  });

  socket.on("message", (msg) => {
    console.log(msg);
    io.to(Array.from(socket.rooms)).emit("message", {
      user: socket.username,
      message: msg,
    });
  });

  socket.on("disconnect", () => {
    console.log("disconnected");
    io.to(Array.from(socket.rooms)).emit("message", {
      user: socket.username,
      message: `${socket.username}님이 나가셨습니다.`,
    });
  });
};

export default socket;
