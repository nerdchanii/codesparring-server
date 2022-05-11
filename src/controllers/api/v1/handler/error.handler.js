import { HTTP_CODE } from '../../../../constants/http.constants';

const errorHandler = function (err, req, res, next) {
  const status = err.status || 500;
  const code = err.code || HTTP_CODE.INTERVAL_SERVER_ERROR;
  const message = err.message || 'Internal Server Error';

  res.status(status).json({ code, message });
};

export default errorHandler;
