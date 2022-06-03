import GameModel from "../model/game.model";

export default class GameService {
  constructor() {
    this._model = new GameModel();
  }

  get model() {
    return this._model;
  }
  createRoom = ({ name }) => {
    const room = this.model.createRoom({ name });
    return room.info;
  };

  getRooms = () => {
    const rooms = this.model.getRooms();
    const roomsInfo = rooms.map((room) => room.info);
    return roomsInfo;
  };

  joinRoom = ({ id, username }) => {
    return this.model.joinRoom({ id, username }).info;
  };

  leaveRoom = ({ id, username }) => {
    return this.model.leaveRoom({ id, username });
  };

  setProblem = ({ roomId, problem }) => {
    return this.model.setProblem({ roomId, problem });
  }

  getProblem = ({ roomId }) => {
    return this.model.getProblem({ roomId });
  }

  gameStart = ({ roomId, problem }) => {
    return this.model.gameStart({ roomId, problem });
  }
}
