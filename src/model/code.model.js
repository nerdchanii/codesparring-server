export default class CodeModel {
  /**
   * @typedef {import('../types').sql} sql
   *
   * @param {*} param0
   */
  constructor({ pool, sql }) {
    this._pool = pool;
    this._sql = sql;
  }

  get sql() {
    return this._sql;
  }

  getProblem = async ({ id }) => {
    const [sql, params] = this.sql.problem.getProblem({ id });
    const [[row], fileds] = await this._pool.query(sql, params);
    return row;
  };
}
