export default class GameService {
  constructor(model) {
    this._model = model;
  }

  get model() {
    return this._model;
  }
  createRoom = ({ nickname }) => {
    const room = this.model.createRoom({ nickname });
    return room.info;
  };

  getRooms = () => {
    const rooms = this.model.getRooms();
    const roomsInfo = rooms.map((room) => room.info);
    return roomsInfo;
  };

  joinRoom = ({ id, nickname }) => {
    return this.model.joinRoom({ id, nickname });
  };

  leaveRoom = () => {
    return this.model.leaveRoom();
  };
}
