import { instrument } from "@socket.io/admin-ui";
import { Server } from "socket.io";
import ProblemModel from "../model/problem.model";
import GameService from "../services/game.service";
import ProblemService from "../services/problem.service";
import pool from '../config/mysql';
import Sql from '../model/sql';

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
    UPDATE_USER_LIST: "updateUserList",
    CREATE_ROOM: "createRoom",
    GET_ROOMS: "getRooms",
  },
  DEFAULT_ROOM_ID: "Hello World",
};

export default class SocketIo {
  constructor(server) {
    const io = new Server(server, {
      cors: {
        origin: ["https://admin.socket.io"],
        credentials: true,
      }
    });
    instrument(io, {
      auth: false
    })
    this.io = io;
    this.gameService = new GameService()
    this.problemService = new ProblemService(new ProblemModel({ pool, sql: new Sql() }));
  }


  on() {

    this.io.on('connect', this.onConnect.bind(this));
  }

  onConnect(socket) {

    socket.on(USER.ACTION.JOIN, this.onJoin.bind(this, { socket }));
    socket.on(USER.ACTION.MESSAGE, this.onMessage.bind(this, { socket }));
    socket.on(USER.ACTION.LEAVE, this.onLeave.bind(this, { socket }));
    socket.on(USER.ACTION.CREATE_ROOM, this.onCreateRoom.bind(this, { socket }));
    socket.on(USER.ACTION.GET_ROOMS, this.onGetRooms.bind(this, { socket }));
    socket.on(USER.ACTION.GAMESTART, this.onGameStart.bind(this, { socket }));
  }

  onGetRooms({ socket }) {
    const rooms = this.gameService.getRooms();
    console.log(rooms, 'rooms');
    socket.emit(USER.ACTION.GET_ROOMS, { rooms });
  }


  onCreateRoom({ socket }, { name }) {
    const room = this.gameService.createRoom({ name });
    socket.emit(USER.ACTION.CREATE_ROOM, { room });
    this.onGetRooms({ socket });
    console.log(room);
  }

  onJoin({ socket }, { username, roomId }) {
    //join room
    console.log('room id:', roomId);
    if (roomId === USER.DEFAULT_ROOM_ID) {
      socket.join(roomId);
      console.log("id: ", roomId)
      this.io.to(roomId).emit(USER.ACTION.JOIN, {
        room: {
          id: roomId,
          name: 'Hello World'
        }
      })
      return;
    }
    socket.join(roomId);
    console.log(`user: ${username} join: ${roomId}`);
    const room = this.gameService.joinRoom({ id: roomId, username });

    this.io.to(roomId).emit(USER.ACTION.JOIN, {
      room
    });
    if (room.status === 'started') {
      this.emitGameStart({ roomId: socket.id, problem: room.problem });
    }
  }

  onLeave({ socket }, { roomId, username }) {
    socket.leave(roomId);
    console.log(`user: ${username} left: ${roomId}`)
    this.gameService.leaveRoom({ id: roomId, username });
    this.io.to(roomId).emit(USER.ACTION.LEAVE, {
      username,
    });
    this.emitMessage({
      username,
      roomId,
      message: `${username}님이 나갔습니다.`
    })

  }

  async onGameStart({ socket }, { roomId, username }) {
    console.log('game start');
    const problem = await this.problemService.getRandomProblem();
    this.gameService.gameStart({ roomId, problem });
    this.emitGameStart({ roomId, problem });
  }

  emitGameStart({ roomId }) {
    return this.io.to(roomId).emit(USER.ACTION.GAMESTART, { problem: this.gameService.getProblem({ roomId }) });
  }

  onMessage = ({ socket }, { username, roomId, message }) => {
    console.log(socket?.handshake?.auth);
    console.log(username, roomId, message);

    this.emitMessage({ username, roomId, message });
  }

  emitMessage({ username, roomId, message }) {

    this.io.to(roomId).emit(USER.ACTION.MESSAGE, { username, message });
  }

  // initializeSocketRoom({ socket }) {

  // }
}
