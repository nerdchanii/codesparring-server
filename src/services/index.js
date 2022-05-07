import Model from '../model';
import AuthService from './auth.service';
import CodeService from './code.service';
import ProblemService from './problem.service';
import NoticeService from './notice.service';
import UserService from './user.service';
import GameService from './game.service';


class Service{
  constructor(){
    this._model = new Model();
    this._authService = new AuthService(this.model);
    this._codeService = new CodeService(this.model);
    this._problemService = new ProblemService(this.model);
    this._noticeService = new NoticeService(this.model);
    this._userService = new UserService(this.model);
    this._gameService = new GameService(this.model);

  }
  get model(){
    return this._model;
  }
  get authService(){
    return this._authService;
  }
  get codeService(){
    return this._codeService;
  }
  get problemService(){
    return this._problemService;
  }
  get noticeService(){
    return this._noticeService;
  }
  get userService(){
    return this._userService;
  }
  get gameService(){
    return this._gameService;
  }



}
export default Service;