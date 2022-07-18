export const ERROR = {
  UNAUTHORIZED: {
    NAME: 'AuthorizationError',
    CODE: 'UNAUTHORIZED',
    MESSAGE: 'Unauthorized',
    STATUS: 401,
  },
  NOT_FOUND: {
    NAME: 'NotFoundError',
    CODE: 'NOT_FOUND',
    MESSAGE: 'Not Found',
    STATUS: 404,
  },

  // 403: Forbidden
  FORBIDDEN: {
    NAME: 'ForbiddenError',
    CODE: 'FORBIDDEN',
    MESSAGE: 'Forbidden',
    STATUS: 403,
  },

  //409 Conflict
  CONFLICT: {
    NAME: 'ConflictError',
    CODE: 'CONFLICT',
    MESSAGE: 'Conflict',
    STATUS: 409,
  }

}

