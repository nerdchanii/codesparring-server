import { HTTP_CODE } from '../../../../constants/http.constants';
import { AuthoricationError } from '../../../../utils/Error';
import jwt from '../../../../utils/jwt';

const AUTH_REQUIRED_LIST = ['/users/*', '/problems/*', '/games/*', '/codes/*'];

const authHandler = function (req, res, next) {
  const { path, method } = req;
  const isAuthRequired = AUTH_REQUIRED_LIST.some((pattern) => path.match(pattern));
  if (path === '/users' && method === 'POST') {
    return next();
  }
  if (isAuthRequired) {
    const { authorization } = req.headers;
    if (authorization === undefined) {
      // authorization header is not defined
      throw new AuthoricationError();
    }
    const token = authorization.split(' ')[1];
    const verify = jwt.verifyToken(token);
    console.log(verify);
    return next();
  }
  return next();
};

export default authHandler;
