import { instrument } from "@socket.io/admin-ui";
import { Server } from "socket.io";
import ProblemModel from "../model/problem.model";
import GameService from "../services/game.service";
import ProblemService from "../services/problem.service";
import pool from '../config/mysql';
import Sql from '../model/sql';
import CodeService from "../services/code.service";
import CodeModel from "../model/code.model";
import UserService from "../services/user.service";
import UserModel from "../model/user.model";

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
    CODE_TEST: "codeTest",
    CODE_SUBMIT: "codeSubmit",
    GAME_END: "gameEnd",
  },
  DEFAULT_ROOM_ID: "Hello World",
};

export default class SocketIo {
  constructor(server) {
    const io = new Server(server, {
      cors: {
        origin: ["https://admin.socket.io"],
        credentials: true,
      },
      path: "/socket.io"

    });
    instrument(io, {
      auth: false
    })
    const sql = new Sql();
    this.io = io;
    this.gameService = new GameService()
    this.problemService = new ProblemService(new ProblemModel({ pool, sql }));
    this.codeService = new CodeService(new CodeModel({ pool, sql }));
    this.userService = new UserService({ model: new UserModel({ pool, sql }) });
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
    socket.on(USER.ACTION.CODE_TEST, this.onCodeTest.bind(this, { socket }));
    socket.on(USER.ACTION.CODE_SUBMIT, this.onCodeSubmit.bind(this, { socket }));
  }

  onGetRooms({ socket }) {
    const rooms = this.gameService.getRooms();
    this.io.emit(USER.ACTION.GET_ROOMS, { rooms });
  }


  onCreateRoom({ socket }, { name }) {
    const room = this.gameService.createRoom({ name });
    socket.emit(USER.ACTION.CREATE_ROOM, { room });

  }

  onJoin({ socket }, { username, roomId }) {
    //join room
    if (roomId === USER.DEFAULT_ROOM_ID) {
      socket.join(roomId);
      this.io.to(roomId).emit(USER.ACTION.JOIN, {
        room: {
          id: roomId,
          name: 'Hello World'
        }
      })

    } else {
      socket.join(roomId);
      const room = this.gameService.joinRoom({ id: roomId, username });
      if (!room) {
        return this.io.to(socket.id).emit(USER.ACTION.JOIN, {
          error: 'Room not found'
        })
      }
      this.io.to(roomId).emit(USER.ACTION.JOIN, {
        room
      });
      if (room.status === 'playing') {
        this.emitGameStart({ roomId: socket.id, problem: room.problem });
      }
      this.onGetRooms({ socket });
    }
    //send welcome message
    this.emitMessage({
      username,
      roomId,
      message: `${username} has joined the room`
    });
  }

  onLeave({ socket }, { roomId, username }) {
    this.gameService.leaveRoom({ id: roomId, username });
    socket.leave(roomId);
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
    const problem = await this.problemService.getRandomProblem();
    this.gameService.setProblem({ roomId, problem });
    this.gameService.gameStart({ roomId, problem });
    this.emitGameStart({ roomId, problem });
  }

  emitGameStart({ roomId }) {
    return this.io.to(roomId).emit(USER.ACTION.GAMESTART, { problem: this.gameService.getProblem({ roomId }) });
  }

  onMessage = ({ socket }, { username, roomId, message }) => {

    this.emitMessage({ socket, username, roomId, message });
  }

  emitMessage({ socket, username, roomId, message }) {
    // socket.to(socket).emit(USER.ACTION.MESSAGE, { username, message })

    this.io.to(roomId).emit(USER.ACTION.MESSAGE, { username, message });
  }

  async onCodeTest({ socket }, { roomId, code, lang }) {
    const problem = this.gameService.getProblem({ roomId });
    const { test_input, test_output } = problem;
    const promises = await Promise.allSettled(test_input.map((input, index) => {
      return this.codeService.codeTest({ lang, code, input, output: test_output[index] })
    }))
    const results = promises.map((promise) => promise.value);
    // const result = await this.codeService.testCode({ lang, code, input: test_input, output: test_output });
    this.emitCodeTest({ socket, results });

  }

  emitCodeTest({ socket, results }) {
    return this.io.to(socket.id).emit(USER.ACTION.CODE_TEST, { results });
  }

  async onCodeSubmit({ socket }, { roomId, username, lang, code }) {
    const problem = this.gameService.getProblem({ roomId });

    const results = await this.codeService.codeSubmit({ problemId: problem.id, lang, code });
    // 하나라도 틀린게 있으면 오류 처리
    const correct = !results.some(({ correct }) => correct === false);
    if (correct) {
      await this.userService.updatePoints({ username, point: 15 });
    }
    this.emitCodeSubmit({ socket, roomId, username, correct });
  }

  emitCodeSubmit({ socket, roomId, username, correct, results }) {
    if (correct) {
      // 누군가가 정답을 맞추었을때! 
      this.gameEnd({ roomId });
      return this.io.to(roomId).emit(USER.ACTION.CODE_SUBMIT, { username, correct });
    }
    return this.io.to(socket.id).emit(USER.ACTION.CODE_SUBMIT, { correct });
  }

  gameEnd({ roomId }) {
    this.gameService.gameEnd({ roomId });
    this.io.to(roomId).emit(USER.ACTION.GAME_END);
  }
}
