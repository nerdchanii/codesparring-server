import { cryptoPassword } from '../utils/crypto';

export default class UserService {
  constructor({ model }) {
    this._model = model;
  }
  get model() {
    return this._model;
  }
  get authService() {
    return this._authService;
  }

  getUser = async ({ username }) => {
    return await this.model.getUser({ username });
  };

  getUsers = async () => {
    return await this.model.getUsers();
  };
  getRanks = async () => {
    return await this.model.getRanks();
  };

  createUser = async ({ username, email, password }) => {
    if (!(await this.isExistEmail({ email })) && !(await this.isExistUsername({ username }))) {
      const { salt, encryptedPassword } = cryptoPassword(password);
      return await this.model.createUser({
        username,
        email,
        password: encryptedPassword,
        salt,
      });
    }
    return false;
    // } else {
    // Error 처리
    // }
  };

  removeUser = async ({ userId }) => {
    return await this.model.removeUser({ userId });
  };

  // 이미 등록된 이메일인지 확인
  isExistEmail = async ({ email }) => {
    return await this.model.isExistEmail({ email });
  };
  // 이미 등록된 닉네임인지 확인
  isExistUsername = async ({ username }) => {
    return await this.model.isExistUsername({ username });
  };

  updatePoints = async ({ username, point }) => {
    return await this.model.updatePoints({ username, point });
  }
}
