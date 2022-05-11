import e from 'cors';
import { HTTP_CODE } from '../../../constants/http.constants';
import UserService from '../../../services/user.service';

export default class UserController {
  /**
   * @param {UserService} service
   */
  constructor({ service }) {
    /** @type {UserService} _service */
    this._service = service;
  }

  get service() {
    return this._service;
  }

  getUser = async (req, res) => {
    const { nickname } = req.params;
    const user = await this.service.getUser({ nickname });
    res.json({
      code: HTTP_CODE.OK,
      result: {
        user: user,
      },
    });
  };
  getUsers = async (req, res) => {
    const users = await this.service.getUsers();
    res.json({
      code: HTTP_CODE.OK,
      result: {
        users: users,
      },
    });
  };
  getRanks = async (req, res) => {
    const users = await this.service.getRanks();
    res.json({
      code: HTTP_CODE.OK,
      result: {
        users: users,
      },
    });
  };

  createUser = async (req, res) => {
    const { email, nickname, password } = req.body;
    const result = await this.service.createUser({ nickname, email, password });
    res.json({
      code: HTTP_CODE.OK,
      result: result,
    });
  };

  removeUser = async (req, res) => {
    const { userId } = req.body;
    const result = await this.service.removeUser({ userId });
    res.json({
      code: HTTP_CODE.OK,
      result: result,
    });
  };
  isExistEmail = async (req, res) => {
    const { email } = req.params;
    const result = await this.service.isExistEmail({ email });
    res.json({
      code: HTTP_CODE.OK,
      result: result,
    });
  };
  isExistNickname = async (req, res) => {
    const { nickname } = req.params;
    const result = await this.service.isExistNickname({ nickname });
    res.json({
      code: HTTP_CODE.OK,
      result: result,
    });
  };
}
