import pool from '../config/mysql';
import Sql from '../model/sql';
import Code from './code.model';
import User from './user.model';
import Problem from './problem.model';
import Notice from './notice.model';
import Auth from './auth.model';
import Game from './game.model';

export default class Database {
  constructor() {
    this._pool = pool;
    this._sql = new Sql();
    this.code = new Code({ pool: this.pool, sql: this.sql });
    this.user = new User({ pool: this.pool, sql: this.sql });
    this.problem = new Problem({ pool: this.pool, sql: this.sql });
    this.notice = new Notice({ pool: this.pool, sql: this.sql });
    this.auth = new Auth({ pool: this.pool, sql: this.sql });
    this.game = new Game();
  }

  get pool() {
    return this._pool;
  }

  get sql() {
    return this._sql;
  }
}
