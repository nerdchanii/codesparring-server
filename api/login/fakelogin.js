import jwt from "jsonwebtoken";
import { uuid } from "uuidv4";
import { getRows, insertRows } from "../../db/db.controller.js";
import {
  varifyAccessToken,
  refreshAccessToken,
  generateAccessToken,
} from "../../middleware/jwt/jwt.js";

const USER_CHECK = (id) => {
  return `SELECT * FROM user WHERE user_naver_id = '${id}'`;
};

function ADD_USER(userInfo) {
  const { naverId, email, nickName } = userInfo;

  return `INSERT INTO user (user_naver_id, user_email, user_nickname) 
  VALUES ('${naverId}', '${email}', '${nickName}')`;
}

async function usercheck(id) {
  const sql = USER_CHECK(id);
  const [rows] = await getRows(sql);
  console.log(rows);
  return !!rows;
}

async function addUser(userInfo) {
  const sql = ADD_USER(userInfo);
  const result = await insertRows(sql); //result 불린형
  return result;
}

// login Controller
const fakelogin = async (req, res) => {
  const fakeId = uuid();
  const fake_nickName = `fake${Math.floor(Math.random() * 10000)}`;
  const userInfo = {
    naverId: fakeId,
    email: `${fake_nickName}@email.com`,
    nickName: fake_nickName,
  };
  const { naverId: id, nickName } = userInfo;

  // user ID db에 있는 지 확인
  const isUser = await usercheck(id); // 유저 아이디가 있는지 확인 isUser: boolean
  switch (isUser) {
    case true:
      return res.json({
        result: "OK",
        token: generateAccessToken({ id, nickName }),
      }); //isUser: true 이면 토큰 생성 후 보내기
    case false:
      const result = await addUser(userInfo);
      if (result) {
        return res.json({
          result: "OK",
          token: generateAccessToken({ id, nickName }),
        });
      }
      return res.json({
        result: "FAIL",
        token: null,
      });
  }
};
export default fakelogin;
