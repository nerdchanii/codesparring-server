import Room from './room';

export default class GameModel {
  constructor() {
    this._roomList = [];
    this._roomcount = 0;
  }

  get model() {
    return this._model;
  }

  createRoom = ({ name }) => {
    const room = new Room({ roomNumber: ++this._roomcount, name });
    this._roomList.push(room);
    return room;
  };

  getRooms = () => {
    return this._roomList;
  };

  joinRoom = ({ id, username }) => {
    const room = this._roomList.find((room) => room.id === id);
    if (!room) {
      throw new Error('Room not found');
    }
    // if user in other room then leave that room
    const otherRoom = this._roomList.find((room) => room.hasUser({ user: username }));
    if (otherRoom) {
      otherRoom.id == id && this.leaveRoom({ id: otherRoom.id, username });
    }
    room.addUser({ user: username });
    return room;
  };

  leaveRoom = ({ id, username, room = undefined }) => {
    if (room) {
      room.removeUser({ user: username });
    } else {
      room = this._roomList.find((room) => room.id === id);
      room?.removeUser({ user: username });
    }
    if (room?.isEmpty()) {
      this.deleteRoom({ id: room.id });
    }
    return true;
  };

  deleteRoom = ({ id }) => {
    this._roomList = this._roomList.filter((room) => room.id !== id);
    return true;
  };

  userInOtherRoom = ({ username }) => {
    const userCheck = this._roomList.find((room) =>
      room.hasUser({ user: username }) ? room : false,
    );
    return userCheck;
  };

  setProblem = ({ roomId, problem }) => {
    const room = this._roomList.find((room) => room.id === roomId);
    if (!room) {
      throw new Error('Room not found');
    }
    room.setProblem({ problem });
    return room;
  }

  getProblem({ roomId }) {
    const room = this._roomList.find((room) => room.id === roomId);
    return room?.problem;
  }

  gameStart = ({ roomId, problem }) => {
    const room = this._roomList.find((room) => room.id === roomId);
    if (!room) {
      throw new Error('Room not found');
    }
    room.gameStart({ problem });
  }

  gameEnd = ({ roomId }) => {
    const room = this._roomList.find((room) => room.id === roomId);
    room?.gameEnd();
  }
}
