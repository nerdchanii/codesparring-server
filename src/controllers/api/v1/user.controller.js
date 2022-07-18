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

  getUser = async (req, res, next) => {
    const { username } = req.params;
    try {
      const user = await this.service.getUser({ username });
      res.json({
        code: HTTP_CODE.OK,
        result: {
          user: user,
        },
      });
    } catch (e) {
      next(e);
    }
  };



  getUsers = async (req, res, next) => {
    try {
      const users = await this.service.getUsers();
      res.json({
        code: HTTP_CODE.OK,
        result: {
          users: users,
        },
      });
    } catch (e) {
      next(e);
    }
  };

  getRanks = async (req, res, next) => {
    try {
      const users = await this.service.getRanks();
      res.json({
        code: HTTP_CODE.OK,
        result: {
          users: users,
        },
      });
    } catch (e) {
      next(e);
    }
  };

  createUser = async (req, res, next) => {
    const { email, username, password } = req.body;
    try {
      const result = await this.service.createUser({ username, email, password });
      return res.json({
        code: HTTP_CODE.OK,
        result: result,
      });
    } catch (e) {
      next(e);
    }
  }

  removeUser = async (req, res, next) => {
    const { userId } = req.body;
    const token = req.headers.authorization;
    try {
      const result = await this.service.removeUser({ userId, token });
      res.json({
        code: HTTP_CODE.OK,
        result: result,
      });
    } catch (e) {
      next(e);
    }
  };

  isExistEmail = async (req, res, next) => {
    const { email } = req.params;
    try {
      const result = await this.service.isExistEmail({ email });
      res.json({
        code: HTTP_CODE.OK,
        result: result,
      });
    } catch (e) {
      next(e);
    }
  };

  isExistUsername = async (req, res, next) => {
    const { username } = req.params;
    try {
      const result = await this.service.isExistUsername({ username });
      res.json({
        code: HTTP_CODE.OK,
        result: result,
      });
    }
    catch (e) {
      next(e);
    }
  };
}
