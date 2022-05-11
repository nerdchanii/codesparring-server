//jwt
import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_SIGN_OPTION } from '../config/jwt';

const createToken = ({ nickname, email }) => {
  return jwt.sign({ nickname, email }, JWT_SECRET, JWT_SIGN_OPTION);
};

const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

const decodeToken = (token) => {
  const { email, nickName } = jwt.decode(token, JWT_SECRET);
  return { email, nickName };
};

const refreshToken = (token) => {
  const { email, nickName } = this.decodeToken(token);
  const newToken = jwt.sign({ email, nickName }, JWT_SECRET);
  return newToken;
};

export default { createToken, verifyToken, decodeToken, refreshToken };
