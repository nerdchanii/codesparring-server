import { decryptoPassword } from '../utils/crypto.js';
import { NotFoundError } from '../utils/Error.js';
import jwt from '../utils/jwt.js';

export default class AuthService {
  constructor(model) {
    this._model = model;
    this.jwt = jwt;
  }

  createToken = async ({ email, password }) => {
    const user = await this._model.getUser({ email });
    console.log(user);
    if (user && user.password === decryptoPassword({ password, salt: user.salt })) {
      const { userId, nickname, email } = user;
      const token = jwt.createToken({ nickname, email });
      return {
        userId,
        profile: {
          nickname,
          email,
        },
        token,
      };
    }
    throw new NotFoundError('아이디 또는 비밀번호가 잘못되었습니다.');
  };

  varifyToken = async ({ token }) => {
    const { nickname, email } = this.jwt.verifyToken(token);
    const [user] = await this._model.getUser({ email });
    if (user && user.nickname === nickname) {
      return true;
    }
    return false;
  };
}
