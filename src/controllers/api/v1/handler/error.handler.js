import { HTTP_CODE } from '../../../../constants/http.constants';

const errorHandler = function(err, req, res, next) {
  const status = err.status || HTTP_CODE.INTERNAL_SERVER_ERROR;
  const message = err.message || 'Internal Server Error';
  const error = {
    status,
    message,
  };
  res.status(status).json({code, message});
}

export default errorHandler;
