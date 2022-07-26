import { uuid } from "uuidv4";
// import socket from "../../socket/socket";
import { varifyAccessToken } from "../../../middleware/jwt/jwt";

class Room {
  _id = 0;
  roomUsers = [];
  MAX_USER = 0;
  number = 0;

  constructor(title, roomNumber) {
    this._id = `ROOM_ID_${Math.floor(Math.random() * 100)}`;
    this.MAX_USER = 4;
    this.roomUsers = [];
    this.number = roomNumber;
    this.roomTitle = title;
  }

  addUser(token) {
    try {
      const userInfo = varifyAccessToken(token);
      if (!userInfo) {
        return false;
      }
      if (this.roomUsers.includes(userInfo.nickName)) {
        return true;
      }
      if (this.roomUsers.length < this.MAX_USER) {
        this.roomUsers.push(userInfo.nickName);
        return true;
      } else {
        return false;
      }
    } catch (e) {
      throw e;
    }
  }

  removeUser(token) {
    try {
      const userInfo = varifyAccessToken(token);
      if (this.roomUsers.includes(userInfo.nickName)) {
        this.roomUsers.splice(this.roomUsers.indexOf(userInfo.nickName), 1);
        return true;
      } else {
        return false;
      }
    } catch (e) {
      throw e;
    }
  }

  getUserList() {
    return this.roomUsers;
  }
}

class RoomList {
  roomList = [];
  _canJoinRoomNumber = Array(500).fill(true);

  constructor() {
    this.roomList = [];
  }

  addRoom(room) {
    if (!this.roomList.includes(room)) {
      this.roomList.push(room);
      return true;
    } else {
      return false;
    }
  }

  removeRoom(room) {
    if (this.roomList.includes(room)) {
      this.roomList.splice(this.roomList.indexOf(room), 1);
      this.roomUpdate();
      return true;
    } else {
      return false;
    }
  }
  roomUpdate() {
    this.roomList.forEach((room) => {
      if (room.roomUsers.length === 0) {
        this.removeRoom(room);
      }
    });
  }
  getRoomList() {
    this.roomUpdate();
    const list = this.roomList.map((r) => {
      return {
        roomUUID: r._id,
        id: r.number,
        userList: r.getUserList(),
        roomTitle: r.roomTitle,
        users: r.roomUsers.length,
      };
    });
    return list;
  }
  getRoomByTitle(roomTitle) {
    const room = this.roomList.find((r) => r.roomTitle === roomTitle);
    return room;
  }

  getRoomByRoomNumber(roomNumber) {
    const room = this.roomList.find((r) => r.number === roomNumber);
    return room;
  }
  getRoomById(id) {
    const room = this.roomList.find((r) => r._id === id);
    return room;
  }

  checkMakeRoom(roomTitle) {
    if (this.roomList.length === 500) {
      return false;
    }
    if (this.roomList.find((r) => r.roomTitle === roomTitle)) {
      return false;
    }
    return true;
  }

  makeRoom(roomTitle) {
    const roomNumber = this.nextRoomNumber();
    const room = new Room(roomTitle, roomNumber);
    this.addRoom(room);
    return this.getRoomByTitle(roomTitle);
  }

  joinRoom(user, room) {
    if (room.addUser(user)) {
      return true;
    } else {
      return false;
    }
  }

  nextRoomNumber() {
    const next = this._canJoinRoomNumber.indexOf(true);
    this._canJoinRoomNumber[next] = false;
    return next;
  }
}

export { Room, RoomList };
