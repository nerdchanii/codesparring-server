export default class ProblemController {
  constructor(service) {
    this._service = service;
  }
  get service(){
    return this._service;
  }
}
