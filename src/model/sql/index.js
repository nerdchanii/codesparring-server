import UserController from '../../controllers/api/v1/user.controller';
import Auth from './auth';
import User from './user';
import Notice from './notice';
import Problem from './problem';
/**
 * @class SQL
 * @description SQL syntax creator
 *
 */
class Sql {
  constructor() {
    this.auth = new Auth();
    this.user = new User();
    this.notice = new Notice();
    this.problem = new Problem();
  }
}

export default Sql;
