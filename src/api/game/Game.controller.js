import socket from "../../socket/socket.js";
import roomlist from "./index.js";

export function GameList(req, res) {
  roomlist.roomUpdate();
  const list = roomlist.getRoomList();
  return res.send(list);
}

export function GameMake(req, res) {
  const roomTitle = req.body.roomTitle;
  if (!("roomTitle" in req.body)) {
    console.log("err");
    return res.sendStatus(500);
  }
  if (!roomlist.checkMakeRoom(roomTitle)) {
    console.log("err");
    return res.sendStatus(400);
  }
  roomlist.makeRoom(roomTitle);
  return res.send({
    result: "success",
    id: roomlist.getRoomByTitle(roomTitle)?.number,
  });
}

export function GameJoin(req, res) {
  const id = req.params.id;
  const token = req.headers?.authorization;
  const room = roomlist.getRoomByRoomNumber(parseInt(id));
  if (token === "null") {
    return res.sendStatus(401);
  }
  if (!room) {
    console.log("err");
    return res.sendStatus(400);
  }
  try {
    const result = room.addUser(token);
    if (result) {
      return res.status(200).json({
        roomNumber: room.number,
        roomTitle: room.roomTitle,
        userList: room.getUserList(),
        roomId: room._id,
      });
    }
    return res.sendStatus(400);
  } catch (e) {
    if (e.name === "TokenExpiredError") {
      return res.sendStatus(401);
    }
    return res.sendStatus(500);
  }
}

export function GameLeave(req, res) {
  const token = req.headers?.authorization;

  console.log("leave Game");
  if (token === "null") {
    // 추후에 여기서 유저 업데이트를 소켓 룸의 인원을 기점으로 수행한다.
    return res.sendStatus(401);
  }
  const room = roomlist.getRoomByRoomNumber(parseInt(req.params.id));
  if (!room) {
    console.log("Room Not Exist");
    return res.sendStatus(400);
  }
  try {
    room.removeUser(token);
    io.to([room._id]).emit("updateRoom", room._id);
    return res.sendStatus(200);
  } catch (e) {
    if (e.name === "TokenExpiredError") {
      return res.sendStatus(401);
    }
    return res.sendStatus(500);
  }
}

export function GameRoomRenew(req, res) {
  const token = req.headers?.authorization;
  console.log("renew");
  if (token === "null") {
    return res.sendStatus(401);
  }
  // get Room by id ( id is roomId)
  const room = roomlist.getRoomById(req.params.roomId);
  if (!room) {
    console.log("Room Not Exist");
    return res.sendStatus(400);
  }
  return res.status(200).json({
    roomNumber: room.number,
    roomTitle: room.roomTitle,
    userList: room.getUserList(),
    roomId: room._id,
  });
}
