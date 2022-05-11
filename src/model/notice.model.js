export default class NoticeModel {
  /**
   *
   */
  constructor({ pool, sql }) {
    this._pool = pool;
    this._sql = sql;
  }
  get pool() {
    return this._pool;
  }
  /**
   * @typedef {{id:int, time:timestamp, title:string, contents: string, writer: string, label: string[]}} notice
   * @returns {Array<notice>} notice list
   */
  getNotices = async () => {
    const [sql, params] = this._sql.notice.getNotices();
    const [rows, fields] = await this.pool.query(sql, params);
    return rows;
  };

  getNotice = async ({ id }) => {
    const [sql, params] = this._sql.notice.getNotice({ id });
    const [[row], fields] = await this._pool.query(sql, params);
    return row;
  };

  createNotice = async ({ title, label, contents }) => {
    const [sql, params] = this._sql.notice.createNotice({
      title,
      label: JSON.stringify(label),
      contents,
    });
    const [{ affectedRows }, fields] = await this._pool.query(sql, params);
    return affectedRows > 0;
  };

  // /**
  //  *
  //  * @param {{id:number}} id - notice id
  //  * @returns boolean
  //  */
  removeNotice = async ({ id }) => {
    const [sql, params] = this._sql.notice.removeNotice({ id });
    const [{ affectedRows }, fields] = await this._pool.query(sql, params);
    return affectedRows > 0;
  };

  /**
   *
   * @param {{id: number,
   * title: string,
   * contents: string,
   * label: string}} params - notice data
   * @returns boolean
   */
  updateNotice = async ({ id, title, contents, label }) => {
    const [sql, params] = this._sql.notice.updateNotice({
      id,
      title,
      contents,
      label: JSON.stringify(label),
    });
    const [{ affectedRows }, fields] = await this._pool.query(sql, params);
    return affectedRows > 0;
  };
}
