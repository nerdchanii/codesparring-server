import Room from './room';

export default class GameModel {
  constructor() {
    this._roomList = [];
    this._roomcount = 0;
  }

  get model() {
    return this._model;
  }

  createRoom = ({ nickname }) => {
    const room = new Room({ user: nickname, roomNumber: ++this._roomcount });
    const otherRoom = this._roomList.find((room) => room.hasUser({ user: nickname }));
    if (otherRoom) {
      console.log('user in other room');
      this.leaveRoom({ nickname, room: otherRoom });
    }
    this._roomList.push(room);
    return room;
  };

  getRooms = () => {
    return this._roomList;
  };

  joinRoom = ({ id, nickname }) => {
    const room = this._roomList.find((room) => room.id === id);
    if (!room) {
      throw new Error('Room not found');
    }
    // if user in other room then leave that room
    const otherRoom = this._roomList.find((room) => room.hasUser({ user: nickname }));
    if (otherRoom) {
      this.leaveRoom({ id: otherRoom.id, nickname });
    }
    room.addUser({ user: nickname });
    return room;
  };

  leaveRoom = ({ id, nickname, room = undefined }) => {
    if (room) {
      room.removeUser({ user: nickname });
    } else {
      room = this._roomList.find((room) => room.id === id);
      room.removeUser({ user: nickname });
    }
    if (room.isEmpty()) {
      console.log('room is empty');
      this.deleteRoom({ id: room.id });
    }
    return true;
  };

  deleteRoom = ({ id }) => {
    this._roomList = this._roomList.filter((room) => room.id !== id);
    return true;
  };

  userInOtherRoom = ({ nickname }) => {
    const userCheck = this._roomList.find((room) =>
      room.hasUser({ user: nickname }) ? room : false,
    );
    return userCheck;
  };
}
