import Service from '../../../services';
import AuthController from './auth.controller';
import CodeController from './code.controller';
import ProblemController from './problem.controller';
import NoticeController from './notice.controller';
import UserController from './user.controller';

class Controllers {
  constructor() {
    this._service = new Service();
    this._authController = new AuthController({ service: this._service.authService });
    this._codeController = new CodeController({ service: this._service.codeService });
    this._problemController = new ProblemController({ service: this._service.problemService });
    this._noticeController = new NoticeController({ service: this._service.noticeService });
    this._userController = new UserController({ service: this._service.userService });
  }

  get authController() {
    return this._authController;
  }

  get codeController() {
    return this._codeController;
  }

  get problemController() {
    return this._problemController;
  }
  get noticeController() {
    return this._noticeController;
  }
  get userController() {
    return this._userController;
  }
  get gameController() {
    return this._gameController;
  }
}

export default new Controllers();
