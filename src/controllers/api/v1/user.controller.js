import { HTTP_CODE } from "../../../constants/http.constants";
import UserService from "../../../services/user.service";

export default class UserController {
  /** 
   * @param {UserService} service 
  */
  constructor(service) {
    /** @type {UserService} _service */
    this._service = service;
  }

  get service() {
    return this._service;
  }
  
  getUser = function(req, res) {
    const { userId } = req.body;
    const user = this.service.getUser({id: userId});
    res.json({
      code: HTTP_CODE.OK,
      result: {
        user: user
      }
    })
  }
  getUsers = function(req, res) { 
    const users = this.service.getUsers()
    res.json({
      code: HTTP_CODE.OK,
      result: {
        users: users
      }
    })
  }
  createUser = function(req, res) {
    const { email, nickname, password } = req.body;
    const result = this.service.createUser({ nickname, email, password });
    res.json({
      code: HTTP_CODE.OK,
      result: result
    })
  }
  removeUser = function(req, res) {
    const { userId } = req.body;
    const result = this.service.removeUser({id: userId});
    res.json({
      code: HTTP_CODE.OK,
      result: result
    })
  }
  isExistEmail = function(req, res) {
    const { email } = req.body;
    const result = this.service.isExistEmail({email});
    res.json({
      code: HTTP_CODE.OK,
      result: result
    })
  }
  isExistNickname = function(req, res) {
    const { nickname } = req.body;
    const result = this.service.isExistNickname({nickname});
    res.json({
      code: HTTP_CODE.OK,
      result: result
    })
  }


}