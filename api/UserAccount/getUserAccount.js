import request from "request";
import { getRows } from "../../db/db.controller.js";
import { varifyAccessToken } from "../../middleware/jwt/jwt.js";

// param : userId ,
// return : sql syntax
// propose : get matched user rows
const sql = (id) => {
  return `select *
from (SELECT
       user_naver_id as id,
       user_nickname as nickName,
       user_email as email,
       user_whole_point as points,
       rank() over (order by user_whole_point desc) as ranking
FROM user) sub_table
where sub_table.id ='${id}'`;
};

// naver 에서 제공한 코드 + 내가 좀 작성한 코드
async function getUserAccount(req, res) {
  const token = req.headers.authorization;
  if (token === "null") {
    return res.sendStatus(401);
  }
  // 토큰 확인
  try {
    const userInfo = varifyAccessToken(token);

    if (!userInfo) {
      return res.sendStatus(401);
    }
    // 유저 정보 확인
    const [row] = await getRows(sql(userInfo.id));

    return res.status(200).json({
      imgsrc: "https://via.placeholder.com/400",
      nickName: row.nickName,
      rank: row.ranking,
      email: row.email,
      points: row.points,
    });
  } catch (e) {
    switch (e.name) {
      case "TokenExpiredError":
        console.log("Errrrr");
        return res.status(401).send({
          result: "TokenExpiredError",
        });

      default:
        return res.sendStatus(500);
    }
  }

  // db 에서 user row 가져오기
}

export default getUserAccount;
