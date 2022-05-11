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

  getUser = async ({ nickname }) => {
    return await this.model.getUser({ nickname });
  };

  getUsers = async () => {
    return await this.model.getUsers();
  };
  getRanks = async () => {
    return await this.model.getRanks();
  };

  createUser = async ({ nickname, email, password }) => {
    if (!(await this.isExistEmail({ email })) && !(await this.isExistNickname({ nickname }))) {
      const { salt, encryptedPassword } = cryptoPassword(password);
      return await this.model.createUser({
        nickname,
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
  isExistNickname = async ({ nickname }) => {
    return await this.model.isExistNickname({ nickname });
  };
}
