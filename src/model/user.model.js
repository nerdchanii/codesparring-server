export default class UserModel {
  constructor({ pool, sql }) {
    this._pool = pool;
    this._sql = sql;
  }

  getUser = async ({ username }) => {
    const [sql, params] = this._sql.user.getUser({ username });
    const [[rows], fields] = await this._pool.query(sql, params);
    return rows;
  };

  getUserById = async ({ userId }) => {
    const [sql, params] = this._sql.user.getUserById({ userId });
    const [[rows], fields] = await this._pool.query(sql, params);
    return rows;
  }


  getUsers = async () => {
    const [sql] = this._sql.user.getUsers();
    const [rows, fields] = await this._pool.query(sql);
    return rows;
  };

  getRanks = async () => {
    const [sql] = this._sql.user.getRanks();
    const [rows, fields] = await this._pool.query(sql);
    return rows;
  };

  createUser = async ({ username, email, salt, password }) => {
    const [sql, params] = this._sql.user.createUser({ username, email, salt, password });
    try {
      const [{ serverStatus, warningStatus }, field] = await this._pool.query(sql, params);

      return serverStatus === 2 && warningStatus === 0;
    } catch (e) {
      return false;
    }
  };

  removeUser = async ({ userId }) => {
    const [sql, params] = this._sql.user.removeUser({ userId });
    const [{ affectedRows }, fields] = await this._pool.query(sql, params);
    return affectedRows === 1;
  };

  isExistEmail = async ({ email }) => {
    const [sql, params] = this._sql.user.isExistEmail({ email });
    const [rows, fields] = await this._pool.query(sql, params);
    return rows && rows.length > 0;
  };
  isExistUsername = async ({ username }) => {
    const [sql, params] = this._sql.user.isExistUsername({ username });
    const [rows, fields] = await this._pool.query(sql, params);
    return rows && rows.length > 0;
  };

  updatePoints = async ({ username, point }) => {
    const [sql, params] = this._sql.user.updatePoints({ username, point });
    const [{ affectedRows }, fields] = await this._pool.query(sql, params);
    return affectedRows === 1;
  }
}
