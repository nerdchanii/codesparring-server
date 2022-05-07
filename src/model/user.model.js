export default class UserModel{
  constructor({pool, sql}){
    this._pool = pool;
    this._sql = sql;
  }

  
  async getUser({id}){
    const [sql, params] = this._sql.users.getUser({id});
    const [rows, fields] = this._pool.query(sql, params);
    return rows;
  }

  async getUsers(){
    const [sql] = this._sql.users.getUsers();
    const [rows, fields] = this._pool.query(sql);
    return rows;
  }
  
  async createUser({nickname, email, password}){
    const [sql, params] = this._sql.users.createUser({nickname, email, password});
    const [rows, fields] = this._pool.query(sql, params);
    return rows;
  }

  async removeUser({id}){
    const [sql, params] = this._sql.users.removeUser({id});
    const [rows, fields] = this._pool.query(sql, params);
    return rows;
  }
  async isExistEmail({email}){
    const [sql, params] = this._sql.users.isExistEmail(email);
    const [rows, fields] = this._pool.query(sql, params);
    return rows;
  }
  async isExistNickname({nickname}){
    const [sql, params] = this._sql.users.isExistNickname({nickname});
    const [rows, fields] = this._pool.query(sql, params);
    return rows;

  }
}