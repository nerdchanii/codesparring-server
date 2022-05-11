import { HTTP_CODE } from '../constants/http.constants';
import { ERROR } from '../constants/error.constants';

export class AuthoricationError extends Error {
  constructor() {
    super(ERROR.UNAUTHORIZED.MESSAGE);
    this.name = ERROR.UNAUTHORIZED.NAME;
    this.status = ERROR.UNAUTHORIZED.STATUS;
    this.code = ERROR.UNAUTHORIZED.CODE;
  }
}

export class NotFoundError extends Error {
  constructor(msg) {
    super(msg || ERROR.NOT_FOUND.MESSAGE);
    this.name = ERROR.NOT_FOUND.NAME;
    this.status = ERROR.NOT_FOUND.STATUS;
    this.code = ERROR.NOT_FOUND.CODE;
  }
}
