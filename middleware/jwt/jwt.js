import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

// 토큰 생성
export function generateAccessToken(id) {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, { expiresIn: "2h" });
}

// 토큰확인
export function varifyAccessToken(token) {
  return jwt.verify(token, process.env.TOKEN_SECRET);
}

// 유효기간확인
export function refreshAccessToken(token) {
  const { id } = jwt.decode(token);
  const newToken = generateAccessToken(id);
  return { result: "REFRESH", token: newToken };
}
