export default class GameService {
  constructor(model){
    this._model = model;
    this._rooms = [];
  }

  get model() {
    return this._model;
  }
  createRoom(){
    return this._model.createRoom();  
  }
  getRooms(){
    return this._model.getRooms();    
  }
  joinRoom(){
    return this._model.joinRoom();
  
  }
  leaveRoom(){
    return this._model.leaveRoom();
  }
  
    
}