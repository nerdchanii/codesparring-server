import e from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config("./.env");

// 토큰 생성
export function generateAccessToken(userInfo) {
  return jwt.sign(userInfo, process.env.TOKEN_SECRET, { expiresIn: "2h" });
}

// 토큰확인
export function varifyAccessToken(token) {
  try {
    const verify = jwt.verify(token, process.env.TOKEN_SECRET);
    return verify;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export function decodeAccessToken(token) {
  const { id, nickName } = jwt.decode(token, process.env.TOKEN_SECRET);
  return { id, nickName };
}
// 유효기간확인
export function refreshAccessToken(token) {
  const { id, nickName } = decodeAccessToken(token);
  const newToken = generateAccessToken(id);
  return { result: "REFRESH", token: newToken };
}
