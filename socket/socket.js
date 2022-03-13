import { io } from "../init.js";
import { getRows } from "../db/db.controller.js";

const socket = (socket) => {
  socket.on("join", async (room) => {
    socket.join(room);
    console.log("join", room);
    io.to(Array.from(socket.rooms)).emit("message", {
      user: socket.username,
      message: "님이 입장하셨습니다.",
    });
  });

  socket.on("message", ({ value: msg, room }) => {
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

  socket.on("gamestart", async () => {
    // console.log("gamestart", id);
    // console.log(socket);
    const room = socket.rooms[Object.keys(socket.rooms)[0]];
    console.log(socket.rooms);
    const [row] = await getRows(
      `SELECT * FROM problem order by rand() limit 1`
    );
    io.to(Array.from(socket.rooms)).emit("gamestart", row);
  });
};

export default socket;
