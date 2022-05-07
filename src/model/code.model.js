export default class CodeModel {
  /**
   * @typedef {import('../types').sql} sql
   * 
   * @param {*} param0 
   */
  constructor({pool, sql}) {
    this._pool = pool;
    this._sql = sql;
  }

  // async insert(table, values) {
  //   const [sql, params] = this._sql.insert(table, values);
  //   const [row, fields] = await this._pool.query(sql, params);
  //   return row;
  // }






  get sql(){
    return this._sql;
  }

  







}