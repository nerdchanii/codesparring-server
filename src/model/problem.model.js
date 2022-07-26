export default class ProblemModel {
  constructor({ pool, sql }) {
    this._pool = pool;
    this._sql = sql;
  }

  get pool() {
    return this._pool;
  }

  get sql() {
    return this._sql;
  }

  getProblems = async () => {
    const [sql, params] = this.sql.problem.getProblems();
    const [row, fields] = await this.pool.query(sql, params);
    return row;
  };
  createProblem = async (problemSet) => {
    try {
      const [sql, params] = this.sql.problem.createProblem(problemSet);
      // affectedRows 은 영향을 받은 row 의 수를 반환한다.
      const [{ affectedRows }, fields] = await this.pool.query(sql, params);
      return affectedRows > 0;
    } catch (e) {
      throw e;
    }
  };
  getProblem = async ({ id }) => {
    const [sql, params] = this.sql.problem.getProblem({ id });
    const [[row], fields] = await this.pool.query(sql, params);
    return row;
  };
  updateProblem = async ({ id, data }) => {
    const [sql, params] = this.sql.problem.updateProblem({ id, data });
    const [{ affectedRows }, fields] = await this.pool.query(sql, params);
    return affectedRows > 0;
  };

  getRandomProblem = async () => {
    const [sql, params] = this.sql.problem.getRandomProblem();
    const [[row], fields] = await this.pool.query(sql, params);
    return row;
  }
}
