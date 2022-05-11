import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import logger from 'morgan';
import { fileURLToPath } from 'url';

import { varifyAccessToken } from './middleware/jwt/jwt.js';

// dotenv.config();

import indexRouter from './routes/index';
import apiRouter from './routes/api';

// 삭제될 것들?
// import cors from "cors";

// create express app
const app = express();

// view engine setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 추후 사라질 것들
// app.use(cors());

app.use('/', indexRouter);
app.use('/api', apiRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use((error, req, res) => {
  res.locals.message = error.message;
  res.locals.error = req.app.get('env') === 'development' ? error : {};
});

export default app;
// socket io
// export const server = http.createServer(app);

// export const io = new Server(server, {
//   cors: {
//     origin: process.env.CLIENT_HOST,
//   },
// });

// io.use((socket, next) => {
//   if (socket.handshake.auth.token) {
//     socket.username = getUserFromToken(socket.handshake.auth.token);
//     next();
//   } else {
//     next(new Err("Please Send Token"));
//   }
// });

// io.on("connect", socket);
// //getUserFromToken은 데이버테이스에서 조회하는 로직이 필요
// const getUserFromToken = (token) => {
//   try {
//     const { nickName } = varifyAccessToken(token);
//     return nickName;
//   } catch (e) {
//     return token.nickName;
//   }
// };

// server.listen(process.env.SERVER_PORT, () => {
//   console.log("start", process.env.SERVER_PORT);
// });
