import { HTTP_CODE } from '../../../constants/http.constants';

export default class GameController {
  constructor({ service }) {
    this._service = service;
  }

  get service() {
    return this._service;
  }

  createRoom = (req, res) => {
    const { nickname } = req.body;
    const room = this.service.createRoom({ nickname });
    res.json({ code: HTTP_CODE.OK, result: room });
  };

  getRooms = (req, res) => {
    const rooms = this.service.getRooms();
    res.json({ code: HTTP_CODE.OK, result: rooms });
  };

  joinRoom = (req, res) => {
    const { id } = req.params;
    const { nickname } = req.body;
    const room = this.service.joinRoom({ id, nickname });
    res.json({ code: HTTP_CODE.OK, result: room });
  };

  leaveRoom = (req, res) => {
    const { id } = req.params;
    const { nickname } = req.body;
    const result = this.service.leaveRoom({ id, nickname });

    res.json({ code: HTTP_CODE.OK, result });
  };
}
