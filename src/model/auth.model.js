
export default class AuthModel{
  constructor({pool, sql}){
    this._pool = pool;
    this._sql = sql;
  }
  
  get pool(){
    return this._pool;
  }
  get sql(){
    return this._sql;
  }

  async getUser({email}){
    // 실제 디비 요청
    const [sql, params] = this.sql.auth.getUser({email});
    const [row, fields] = await this._pool.query(sql, params);
    if (row.length === 1) {
      return row[0];
    }
    
    // It will be modified in the future
    // return Error('User not found');
    return null;
  }


  

  

  
  
}