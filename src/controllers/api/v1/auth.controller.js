import { HTTP_CODE } from '../../../constants/http.constants';
import AuthService from '../../../services/auth.service';
import { NotFoundError } from '../../../utils/Error';

export default class AuthController {
  constructor({ service }) {
    /**
     *
     * @type {AuthService} _servcie
     */
    this._service = service;
  }
  get service() {
    return this._service;
  }

  createToken = async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const auth = await this.service.createToken({ email, password });
      return res.json({
        code: HTTP_CODE.OK,
        result: {
          auth,
        },
      });
    } catch (e) {
      next(e);
    }
  };
}
