import { io } from "../init.js";
import { getRows } from "../db/db.controller.js";
import roomList from "../api/game/index.js";

const USER = {
  CONNECTED: "connected",
  ROOM: {
    SPARRING: "sparring",
    PRACTICE: "practice",
  },
  ACTION: {
    JOIN: "join",
    LEAVE: "leave",
    GAMESTART: "gamestart",
    MESSAGE: "message",
    UPDATE_USER_LIST: "updateUser",
  },
};

const socket = (socket) => {
  socket.on(USER.ACTION.JOIN, async (roomId) => {
    socket.join(roomId);
    joinMessage(socket, roomId);
  });

  socket.on(USER.ACTION.MESSAGE, ({ value: msg, room }) => {
    sendMessage(socket, msg, room);
  });

  socket.on(USER.ACTION.UPDATE_USER_LIST, (id) => {
    updateUserList(id, socket);
  });
  socket.on(USER.ACTION.LEAVE, (room) => {
    socket.leave(room);
    leaveMessage(socket, room);
    updateUserList(room, socket);
  });

  socket.on("gamestart", async ({ room: roomId }) => {
    console.log("gamestart", roomId);
    await gameStart(socket, roomId);
  });
  socket.on("gameRoomJoin", async (roomId) => {
    console.log("gameRoomJoin!!!!!!!!!", roomId);
    io.to([socket.id, roomId]).emit("roomNeedUpdate", roomId);
  });
};

export default socket;

function updateUserList(id, socket) {
  const room = roomList.getRoomById(id);
  if (!!room) {
    const userList = room.getUserList();
    io.to([socket.id, id]).emit(USER.ACTION.UPDATE_USER_LIST, userList);
  }
}

function leaveMessage(socket, room) {
  sendMessage(socket, `${socket.username}님이 퇴장하셨습니다.`, room);
}

function joinMessage(socket, room) {
  sendMessage(socket, `${socket.username}님이 입장하셨습니다.`, room);
}

async function gameStart(socket, room) {
  console.log("gameStart", socket.rooms);
  const [row] = await getRows(`SELECT * FROM problem order by rand() limit 1`);
  io.to([socket.id, room]).emit("gamestart", row);
}

function sendMessage(socket, msg, room) {
  io.to([socket.id, room]).emit("message", {
    user: socket.username,
    message: msg,
    room,
  });
}
