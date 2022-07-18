import { HTTP_CODE } from '../constants/http.constants';
import { ERROR } from '../constants/error.constants';

export class AuthorizationError extends Error {
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

export class ForbiddenError extends Error {
  constructor(msg) {
    super(msg || ERROR.FORBIDDEN.MESSAGE);
    this.name = ERROR.FORBIDDEN.NAME;
    this.status = ERROR.FORBIDDEN.STATUS;
    this.code = ERROR.FORBIDDEN.CODE;
  }
}

export class ConflictError extends Error {
  constructor(msg) {
    super(msg || ERROR.CONFLICT.MESSAGE);
    this.name = ERROR.CONFLICT.NAME;
    this.status = ERROR.CONFLICT.STATUS;
    this.code = ERROR.CONFLICT.CODE;
  }
}