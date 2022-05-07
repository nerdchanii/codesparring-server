import { HTTP_CODE } from "../../../constants/http.constants";

export default class AuthController {
  constructor(service) {
    this._service = service;
  }
  
  createToken = function(req, res) {
    const { email, password } = req.body;
    const token = this.service.createToken(email, password);
    
    res.json({
      code: HTTP_CODE.OK,
      result: {
        token: token
      },
    });
  }

  get service(){
    this._service;
  }
}
