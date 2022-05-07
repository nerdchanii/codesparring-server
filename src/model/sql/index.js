import UserController from '../../controllers/api/v1/user.controller';
import Auth from './auth';
import User from './user';

/**
 * @class SQL
 * @description SQL syntax creator
 * 
 */
class Sql{
  constructor(){
    this.auth = new Auth();
    this.user = new User();
  }

}

  
  

export default Sql;
