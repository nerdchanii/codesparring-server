export default class GameController {
  constructor(service) {
    this._service = service;
  }

  createRoom = function(req, res) {
    // each controller
    res.json({ code: HTTP_CODE.OK, result: { } })
  }

  getRooms = function(req, res) {
    // each controller
    res.json({ code: HTTP_CODE.OK, result: { } })
  }

  joinRoom = function(req, res) {
    // each controller
    res.json({ code: HTTP_CODE.OK, result: { } })
  }

  leaveRoom = function(req, res) {
    // each controller
    res.json({ code: HTTP_CODE.OK, result: { }
    })
  }
}