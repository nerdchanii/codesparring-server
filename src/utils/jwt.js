//jwt
import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_SIGN_OPTION } from '../config/jwt';

const createToken = ({ username, email }) => {
  return jwt.sign({ username, email }, JWT_SECRET, JWT_SIGN_OPTION);
};

const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

const decodeToken = (token) => {
  const { email, username } = jwt.decode(token, JWT_SECRET);
  return { email, username };
};

const refreshToken = (token) => {
  const { email, username } = this.decodeToken(token);
  const newToken = jwt.sign({ email, username }, JWT_SECRET);
  return newToken;
};

export default { createToken, verifyToken, decodeToken, refreshToken };
